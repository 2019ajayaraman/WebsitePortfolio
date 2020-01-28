#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var cookieSession = require('cookie-session')
var express = require('express')
var simpleoauth2 = require("simple-oauth2");
var app = express();
var path = require('path');

var request = require('request');

var hbs = require('hbs');

var fs = require('fs');

var combinatorics = require('js-combinatorics');

var server =  require('http').createServer(app);      // import http and create a server
var io = require('socket.io').listen(server);         // attach socket.io to the server

//npm install

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

//app.set('port', process.env.PORT || 8080 );

server.listen(process.env.PORT || 8080);              // listen for incoming connections

app.set('view engine', 'hbs');

app.set('trust proxy', 1) 


app.use(cookieSession({ 
  name: 'ajayaramCookies',
  keys: ['jellyfishes76', 'porcupine84'] //CHANGE KEYES
}))


// -------------- express 'variables -------------- //

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')))


var visitorCount = 0;

//Survey 
var purp = 0;
var grn = 0;
var count = 0;
var valid = false;

var ion_client_id = 'FEIqc7Bia0CVksQD3F5iE0og3sbvmd8tCX7hpoII';
var ion_client_secret = '1ASS6yPEtERnVlxtZiCsRslH3akj4BbgBlXbWAX7TOgvXYRRtd9I39IV9G42Eo4yJ9lmePQaQwVJ68iSjpHLz72KwG6zjXWsr0DYUTu79gEBiGmj4tjKWLDfv4Q5j7h0';
var ion_redirect_uri = 'https://user.tjhsst.edu/2019ajayaram/redirect';



var oauth2 = simpleoauth2.create({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});



var ion_redirect_uri_socket = 'https://user.tjhsst.edu/2019ajayaram/redirectSocket';


var authorizationUriSocket = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri_socket
});






var ionUser = "";

//socket chat 
var messageLog = [];
app.get('/socket_chat', function (req, res, next) {
    
    if (typeof req.session.token == 'undefined') {
 
        var output_string = "";
        output_string += "<div style=\"margin: auto; width: 20%;\"><a style=\"text-align:center;\" href="+authorizationUriSocket+">AUTHORIZE ACCESS</a></div>"

        res.send(output_string);
    }
    else{
        
         var access_token = req.session.token.token.access_token;

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;


        request.get( {url:my_ion_request}, function (e, r, body) {

            res_object = JSON.parse(body);
            
            ionUser = res_object['ion_username'];

        });
        
        res.sendFile(__dirname+'/chat_socket.html');
        
    }
    
});


// -------------- socket initialization -------------- //
io.on('connection',function(socket){                  // called when a new socket connection is made

    console.log('new socket connection');
    
        socket.on('client_evt', function(obj){            // server side socket callbacks for events
        console.log('client message!');
        
        var temp = [ionUser, obj];
        console.log(temp);
        
        
        /*if (messageLog.length <= 5 && obj!=''){
            messageLog.unshift(temp);
        }
        else if (messageLog.length > 5 && obj!=''){
            messageLog.pop();
            messageLog.unshift(temp);
        }*/
    
        io.emit('server_msg', temp);      
    });

})

app.get('/redirectSocket', async function (req, res) {

    if (typeof req.query.code != 'undefined') {
        
        var theCode = req.query.code 

        var options = {
            code: theCode,
            redirect_uri: ion_redirect_uri_socket,
            scope: 'read'
         };

        result = await oauth2.authorizationCode.getToken(options);
        token = oauth2.accessToken.create(result);
        
        req.session.token = token;
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/socket_chat');
        

    } else {
        res.send('no code attached')
    }
});