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
                        
                        res.render('cookieclick', dict);

                    });
                }
                else {
                    pool.query('SELECT * FROM cookieClick WHERE id=?', userProfileName, function (error, info, fields) {
                        if (error) throw error;
        
                        dict['boost']=info[0].booster;
                        dict['score']=info[0].score;
                        dict['auto']=info[0].auto;

                        res.render('cookieclick', dict);
                    });
                }
            });