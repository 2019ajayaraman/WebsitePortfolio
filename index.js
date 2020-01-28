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

//npm install

// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );


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


var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});

var ion_redirect_uri_scrabble = 'https://user.tjhsst.edu/2019ajayaram/redirectScrabble';


var authorizationUriScrab = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri_scrabble
});

var ion_redirect_uri_cclick = 'https://user.tjhsst.edu/2019ajayaram/redirectCClicker';


var authorizationUriCClick = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri_cclick
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
app.get('/connect4', function(req, res){

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
                        
                        res.render('connect4', dict);

                    });
                }
                else {
                    pool.query('SELECT * FROM connect4 WHERE id=?', userProfileName, function (error, info, fields) {
                        if (error) throw error;
                        
                        dict['played'] = info[0].played;
                        dict['won'] = info[0].won;
                            
                        res.render('connect4', dict);
                    });
                }
            });

            //res.render('connect4', dict);
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
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/connect4');
        

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



//CookieClicker

app.get('/cookieclicker', function (req, res){
    if (typeof req.session.token == 'undefined') {
 
        var output_string = "";
        output_string += "<div style=\"margin: auto; width: 20%;\"><a style=\"text-align:center;\" href="+authorizationUriCClick+">AUTHORIZE ACCESS</a></div>"

        res.send(output_string);
    }
    else{
        
        var access_token = req.session.token.token.access_token;

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;


        request.get( {url:my_ion_request}, function (e, r, body) {

            res_object = JSON.parse(body);
            
            userProfileName = res_object['ion_username']; //send thru hbs
            
            var dict = {
                user: userProfileName
            }
            
            var userList = {};
            var indArr = [];
            pool.query("SELECT id FROM cookieClick", function(err, result, field){

                for (i=0; i<result.length; i++){
                    indArr.push(result[i].id);
                }
                
                if (!indArr.includes(userProfileName)){
                    
                    var new_user = {
                        id : userProfileName,
                        score: 0,
                        booster: 1,
                        auto: 0
                    }
 	
 	                pool.query('INSERT INTO cookieClick SET ?', new_user, function (error, results, fields) {
                        if (error) throw error;
                        dict['boost'] = 1;
                        dict['score'] = 0;
                        dict['auto']=0;
                        
                        //console.log(dict);
                        res.render('cookieclick', dict);

                    });
                }
                else {
                    pool.query('SELECT * FROM cookieClick WHERE id=?', userProfileName, function (error, info, fields) {
                        if (error) throw error;
        
                        
  
                        dict['boost']=info[0].booster;
                        dict['score']=info[0].score;
                        dict['auto']=info[0].auto;
                        
                        //console.log(dict);
                
                        res.render('cookieclick', dict);
                
                    });
                }
                
            });
            
            
            
            //res.render('cookieclick', dict);
            
        });
        
        
        
    }
})

app.get('/redirectCClicker', async function (req, res) {

    if (typeof req.query.code != 'undefined') {
        
        var theCode = req.query.code 

        var options = {
            code: theCode,
            redirect_uri: ion_redirect_uri_cclick,
            scope: 'read'
         };

        result = await oauth2.authorizationCode.getToken(options);
        token = oauth2.accessToken.create(result);
        
        req.session.token = token;
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/cookieclicker');
        

    } else {
        res.send('no code attached')
    }
});

app.get('/cclick_saveEnd', function(req, res){
    
    var money = parseInt(req.query.scoreMoney, 10);
    var boost = (parseInt(req.query.boostNum, 10));
    var auto = (parseInt(req.query.autoNum, 10));
    
    pool.query("UPDATE cookieClick SET score=?, booster=?, auto=? WHERE id=? ", [money, boost, auto, userProfileName], function(err, result, field){
        if(err){
            next(err);
            return;
        }
        
        //

        res.send({});
    });
    
 });
 
 app.get('/cclick_rankEnd', function(req, res){
    
    pool.query('SELECT id, score FROM cookieClick ORDER BY score DESC LIMIT 5', function (error, info, fields){
        if(error){
            next(error);
            return;
        }
        
        dict = {
            "rankInfo":info
        }
        
        console.log(info);

        res.send(dict);
    });
    
 });
 


//Basic Practice Database

app.get('/database', function(req, res){

    pool.query('SELECT id FROM dataPpl ORDER BY id ASC', function (error, results, fields) {
        if (error) throw error;
  
        var indArr = [];
        for (i=0; i<results.length; i++){
            indArr.push(results[i].id);
        }
        
        var dict = {
            "results": indArr,
            "grn":"green"
        }
        
        res.render('database', dict);
    });

})

app.get('/dataB_resultEnd', function(req, res){
 	var id = req.query.dropDown;
 	var response = {};
 	pool.query('SELECT * FROM dataPpl WHERE id='+id, function (error, results, fields) {
        if (error) throw error;
        var response = {
            "id" : id,
            "name" : results[0].name
        }
        console.log(response);
        res.send(response);
    });

 });
 
 app.get('/dataB_updateEnd', function(req, res){
 	var id = req.query.dropDown;
 	var newN = req.query.modName;
 	
 	pool.query('UPDATE dataPpl SET name=\''+newN+'\' WHERE id='+id, function (error, results, fields) {
        if (error) throw error;

        res.send({});
    });
    

 });
 
  app.get('/dataB_addEnd', function(req, res){
 	var newID = req.query.newID;
 	var newN = req.query.newName;
 	
 	var new_person = {
        id : newID,
        name : newN
    }
 	
 	pool.query('INSERT INTO dataPpl SET ?', new_person, function (error, results, fields) {
        if (error) throw error;

        res.send({});
    });
    

 });



//scrable word finder
app.get('/scrabble', function (req, res){
    
    
    if (typeof req.session.token == 'undefined') {
 
        var output_string = "";
        output_string += "<div style=\"margin: auto; width: 20%;\"><a style=\"text-align:center;\" href="+authorizationUriScrab+">AUTHORIZE ACCESS</a></div>"

        res.send(output_string);
    }
    else{
        
        var access_token = req.session.token.token.access_token;

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;


        request.get( {url:my_ion_request}, function (e, r, body) {

            res_object = JSON.parse(body);
            
            username = res_object['short_name'];
            
            var render_dict = {
 	            "name": username
 	        }
            
            res.render('scrabble', render_dict);
        });
        
    }
    
});

app.get('/scrabble_endpoint', function(req, res){
    
    var wordAlgo = require('./wordFindAlgo.js');
    
    chars = fs.readFileSync(__dirname + '//resources//enable1.txt').toString();
    words = chars.split('\n');
    
 	var wildNum = req.query.wild;
 	var l1 = req.query.letter1;
 	var l2 = req.query.letter2;
 	var l3 = req.query.letter3;
 	var l4 = req.query.letter4;
 	var l5 = req.query.letter5;
 	var l6 = req.query.letter6;
 	var l7 = req.query.letter7;
 	var pos1 = req.query.pos1;
 	var pos2 = req.query.pos2;
 	var pos3 = req.query.pos3;
 	var pos4 = req.query.pos4;
 	var pos5 = req.query.pos5;
 	var pos6 = req.query.pos6;
 	var pos7 = req.query.pos7;
 	var wLen = parseInt(req.query.wLen,10);
 	
 	var letterPos = wordAlgo.readInData(l1, l2, l3, l4, l5, l6, l7, pos1, pos2, pos3, pos4, pos5, pos6, pos7);
 	
 	var letters = letterPos[0];
 	sizeTrim = wordAlgo.trimLen(wLen, words);
 	
 	cmb = combinatorics.combination(letters, wLen).toArray();
 	

 	var arrC = [];
 	
 	for (var i=0; i<cmb.length; i++){
 	    var temp = wordAlgo.trimCombo(cmb[i], sizeTrim);
 	    arrC = arrC.concat(temp);
 	    console.log(arrC);
 	}
 	
 	arrPosChange = wordAlgo.trimPos(letterPos, arrC);
 	
 	arrFinal = Array.from(new Set(arrPosChange));
 	
 	arrFinal.sort();
 	
 	results= {
 	    "final": arrFinal
 	}
 	
 	res.send(results);

 });
 

app.get('/redirectScrabble', async function (req, res) {

    if (typeof req.query.code != 'undefined') {
        
        var theCode = req.query.code 

        var options = {
            code: theCode,
            redirect_uri: ion_redirect_uri_scrabble,
            scope: 'read'
         };

        result = await oauth2.authorizationCode.getToken(options);
        token = oauth2.accessToken.create(result);
        
        req.session.token = token;
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/scrabble');
        

    } else {
        res.send('no code attached')
    }
});



//oauth

var username = "";
app.get('/login', [getInfo], function (req, res) {

    // Here we ask if the token key has been attached to the session...
    if (typeof req.session.token == 'undefined') {
 
        var render_dict = {
            "link": authorizationUri,
            "login": true
        };

        res.render('profile', render_dict);

    } else {

        var access_token = req.session.token.token.access_token;
        

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;

        // Perform the asyncrounous request ...
        request.get( {url:my_ion_request}, function (e, r, body) {
 
            var res_object = JSON.parse(body);
        
            picture = res_object['picture'];
            email = res_object['tj_email'];
            req.session.viewsP = (req.session.viewsP||0)+1;


        var render_dict = {
            "name": username,
            "views": req.session.viewsP,
            "pic": picture,
            "login": false,
            "email": email
        };

        res.render('profile', render_dict);
            
            
        });
    }
});

app.get('/counselor', [getInfo], function(req, res){
    
    if (typeof req.session.token != 'undefined'){
        
        var access_token = req.session.token.token.access_token;
        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;

        // Perform the asyncrounous request ...
        request.get( {url:my_ion_request}, function (e, r, body) {
 
            var res_object = JSON.parse(body);
        
            cEmail = res_object['counselor']['username']+'@fcps.edu';
            cName = res_object['counselor']['full_name'];
            
            var render_dict = {
            "name": username,
            "views": req.session.viewsP,
            "cEmail": cEmail,
            "cName": cName,
            "pageC": true
            };

            res.render('oauthInfo', render_dict);

        });
        
    }
    else{
        res.redirect('https://user.tjhsst.edu/2019ajayaram/login');
    }
    
})

app.get('/grade', [getInfo], function(req, res){
    
    if (typeof req.session.token != 'undefined'){
        
        var access_token = req.session.token.token.access_token;
        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;

        // Perform the asyncrounous request ...
        request.get( {url:my_ion_request}, function (e, r, body) {
 
            var res_object = JSON.parse(body);
        
            grade_num = res_object['grade']['number'];
            grade_name = res_object['grade']['name'];
            grad = res_object['graduation_year'];
            
            var render_dict = {
            "name": username,
            "views": req.session.viewsP,
            "gradeNum": grade_num,
            "gradeName": grade_name,
            "grad": grad,
            "pageC": false
            };

            res.render('oauthInfo', render_dict);
        });
        
    }
    else{
        res.redirect('https://user.tjhsst.edu/2019ajayaram/login');
    }
    
})

function getInfo (req, res, next){
    
    
    if (typeof req.session.token == 'undefined') {
 
        var render_dict = {
            "link": authorizationUri,
            "login": true
        };

        res.render('profile', render_dict);

    }
    else {
        
        var access_token = req.session.token.token.access_token;

        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;


        request.get( {url:my_ion_request}, function (e, r, body) {

            res_object = JSON.parse(body);
            
            username = res_object['short_name'];
            next();
            
        });
        
    }
    

    
}

app.get('/redirect', async function (req, res) {

    // The whole purpose of this 'get' handler is to attach your  token to the session. 
    // Your users should not be going here if they are not trying to login in - and you
    // should not be attaching your login token in any other methods (like the default landing page)

    // Step one. Assuming we were send here following an authentication and that there is a code attached.
    if (typeof req.query.code != 'undefined') {
        
        // This code was generated by ION. We need it to...
        var theCode = req.query.code 

        // .. construct options that will be used to generate a login token
        var options = {
            code: theCode,
            redirect_uri: ion_redirect_uri,
            scope: 'read'
         };

        // This code will be passed back to ion to request a token.
        result = await oauth2.authorizationCode.getToken(options);
        token = oauth2.accessToken.create(result);
        
        // attach the token to the cookie
        req.session.token = token;
        

        res.redirect('https://user.tjhsst.edu/2019ajayaram/login');
        

    } else {
        res.send('no code attached')
    }
});



//State Borders

function countVisitors (req, res, next) {
    visitorCount++;
    console.log(visitorCount);
    next();
}

function getClientIP (req, res, next) {
    var IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.locals.ip_addr = IP;
    
    next();
}

app.get('/stateborders', [countVisitors], function(req, res){
    
    var render_dict = {
        count: visitorCount,
        hello: [1,2,3]
    }
    
    res.render('stateborders', render_dict);
})


app.get('/do_states_border', [getClientIP], function(req, res){
    var borders = require('./state_borders.js');
    
    var s1 = req.query.s1;
    var s2 = req.query.s2;
    

    var request ="";
    var answer ="";
        

    if (s1 == null || s2 == null || s1 == undefined || s2 == undefined)
    {
        request = "One of the states in your request is invalid."
        answer = "Please read the instructions again."
    }
    
    else if (!isNaN(s1) || !isNaN(s2))
    {
        request = "One of the states in your request is invalid.";
        answer = "Please read the instructions again.";
    }
    
    else
    {
        var state1 = borders.getState(s1);
        var state2 = borders.getState(s2);
        
        var dBorder = borders.doStatesBorder(state1, state2);
        
        if (dBorder == undefined)
        {
            request = "One of the states in your request is invalid.";
            answer = "Please read the instructions again.";
        }
        
        else {
            request = "You asked whether "+state1+" borders "+state2+".";
            if (dBorder == true){
                answer = "They do!";
            }
            else {
                answer = "No they don't."
            }
        }
        
        
    }
    
    var render_dict = {
        ip: res.locals.ip_addr,
        req: request,
        ans: answer,
        func: 'doStatesBorder'
    }

     res.render('sbfunctions', render_dict);
    
});

app.get('/get_state_borders', [getClientIP], function(req, res){
    
    var borders = require('./state_borders.js');
    
    var s1 = req.query.s1;
    
    var request ="";
    var answer ="";
    
    
    if (s1 == null || s1 == undefined)
    {
        request = "One of the states in your request is invalid."
        answer = "Please read the instructions again."
    }
    
    else if (!isNaN(s1))
    {
        request = "One of the states in your request is invalid."
        answer = "Please read the instructions again."
    }
    
    else
    {
        var state = borders.getState(s1);
    
        var sBord = borders.getStateBorders(state);
    
        
        
        if (sBord == undefined)
        {
            request = "One of the states in your request is invalid."
            answer = "Please read the instructions again."
        }
        else
        {
            request = "You asked which states border "+state+".";
            answer = sBord.join(", ");
        }
    }
    
    var render_dict = {
        ip: res.locals.ip_addr,
        req: request,
        ans: answer,
        func: 'getStateBorders'
    }

     res.render('sbfunctions', render_dict);
    
});


app.get('/get_close_states', [getClientIP], function(req, res){
    var borders = require('./state_borders.js');
    
    var s1 = req.query.s1;
    
    
    
    if (s1 == null || s1 == undefined)
    {
        request = "One of the states in your request is invalid."
        answer = "Please read the instructions again."
    }
    else if (!isNaN(s1))
    {
        request = "One of the states in your request is invalid."
        answer = "Please read the instructions again."
    }
    else
    {
        var state = borders.getState(s1);
    
        var sBord = borders.getCloseStates(state);
    
         if (sBord == undefined)
        {
            request = "One of the states in your request is invalid."
            answer = "Please read the instructions again."
        }
        else{
            request = "You asked which states are close to "+state+".";
            answer = sBord.join(", ");
        }
        
    }
    var render_dict = {
        ip: res.locals.ip_addr,
        req: request,
        ans: answer,
        func: 'getCloseStates'
    }

     res.render('sbfunctions', render_dict);
    
});


app.get('/states_with_borders', [getClientIP], function(req, res){
    var borders = require('./state_borders.js');
    
    var num = req.query.n;

    
    if (num == null || num == undefined)
    {
        request = "Number is invalid."
        answer = "Please read the instructions again."
    }
    
    if (isNaN(num))
    {
        request = "Number is invalid."
        answer = "Please read the instructions again."
    }
    else{
    
    var sBord = borders.statesWithBorders(num);
    
    
    if (sBord.length === 0){
     answer = 'none';   
    }
    else{
        answer = sBord.join(", ");
    }
    
    
    request = "You asked which states have "+num+" states that borders it.";
    }
    
    var render_dict = {
        ip: res.locals.ip_addr,
        req: request,
        ans: answer,
        func: 'statesWithBorders'
    }

     res.render('sbfunctions', render_dict);
});



//State Game
app.get('/stategame', function(req, res){
    res.sendFile(__dirname + '/stategame.html');
});



//AJAX Survey
app.get('/ajax_survey', function(req, res){
    res.sendFile(__dirname+'/ajax_survey.html');
    
})

app.get('/ajax_survey_update', function(req, res){
    var response = {
 		"purple":purp,
 		"green":grn,
 		"count":count,
 		"valid": valid
 	}
 	res.send(response);
 });
 
app.get('/ajax_survey_clear', function(req, res){
    purp = 0;
    grn = 0;
    count = 0;
    valid = false;
 });

app.get('/ajax_survey_endpoint', function(req, res){
 	var color = req.query.color;
 	
 	count++;
 	
 	if (count > 6){
 	    valid = true;
 	}
 	
 	if (color=="purple"){
 	    purp++;
 	}
 	if (color == "green"){
 	    grn++;
 	}

 	var response = {
 		"purple":purp,
 		"green":grn,
 		"count":count,
 		"valid": valid
 	}

 	res.send(response);

 });

//General Pages
app.get('/', function(req, res){
    res.sendFile(__dirname+'/home.html');
    
})

app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
})


app.get('/:page', function(req, res){

    
    res.sendFile(__dirname+'/notValid.html');
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
