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

var mysql = require('mysql');

var vuejs = require('vue');

var server =  require('http').createServer(app);      // import http and create a server
var io = require('socket.io').listen(server);         // attach socket.io to the server

/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;*/

//npm install

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

server.listen(process.env.PORT || 8080); 

var button_count = 0;


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



var ion_redirect_uri_c4 = 'https://user.tjhsst.edu/2019ajayaram/redirectC4';


var authorizationUriC4 = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri_c4
});

var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_2019ajayara',
  password        : 'emc2M6YcKtHdGwBe9u7djNd6',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_2019ajayaram'
});


// -------------- express 'get' handlers -------------- //


var userProfileName = "";
//Final Project - Connect 4 
app.get('/', function(req, res){

    if (typeof req.session.token == 'undefined') {
 
        var output_string = "";
        output_string += "<div style=\"margin: auto; width: 20%;\"><a style=\"text-align:center;\" href="+authorizationUriC4+">AUTHORIZE ACCESS</a></div>"

        res.send(output_string); //make it pretty
    } else {

        var access_token = req.session.token.token.access_token;

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;

        request.get( {url:my_ion_request}, function (e, r, body) {
 
            var res_object = JSON.parse(body);
        
            userProfileName = res_object['ion_username'];

            var dict = {
                "name": userProfileName
            };
            
            var userList = {};
            var indArr = [];
            pool.query("SELECT id FROM connect4", function(err, result, field){

                for (i=0; i<result.length; i++){
                    indArr.push(result[i].id);
                }
                
                if (!indArr.includes(userProfileName)){
                    
                    var new_user = {
                        id : userProfileName,
                        played: 0,
                        won: 0
                    }
 	
 	                pool.query('INSERT INTO connect4 SET ?', new_user, function (error, results, fields) {
                        if (error) throw error;
                        dict['played'] = 0;
                        dict['won'] = 0;
                        
                        res.render('connect4socket', dict);

                    });
                }
                else {
                    pool.query('SELECT * FROM connect4 WHERE id=?', userProfileName, function (error, info, fields) {
                        if (error) throw error;
                        
                        dict['played'] = info[0].played;
                        dict['won'] = info[0].won;
                            
                        res.render('connect4socket', dict);
                    });
                }
            });

        });
    }
});

app.get('/redirectC4', async function (req, res) {

    if (typeof req.query.code != 'undefined') {
        
        var theCode = req.query.code 

        var options = {
            code: theCode,
            redirect_uri: ion_redirect_uri_c4,
            scope: 'read'
         };

        result = await oauth2.authorizationCode.getToken(options);
        token = oauth2.accessToken.create(result);
        
        req.session.token = token;
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/');
        

    } else {
        res.send('no code attached')
    }
});

app.get('/c4_saveScores', function(req, res){
    

    var played = parseInt(req.query.played, 10);
    var won = parseInt(req.query.won, 10);
    
    pool.query("UPDATE connect4 SET played=?, won=? WHERE id=? ", [played, won, userProfileName], function(err, result, field){
        if(err){
            next(err);
            return;
        }
        
        //

        res.send({});
    });
    
 });
 



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

