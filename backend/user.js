var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

router.get('/all/auth/:id_token', function (req, res){

    var id_token = req.params.id_token;
    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute query');
            db.execQuery('SELECT * FROM get_users($1)', [id], function(Qres, err){
                console.log('Executing all-users query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.get('/single/auth/:id_token', function (req, res){
    var id_token = req.params.id_token;
    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute query');
            db.execQuery('SELECT * FROM get_user($1)', [id], function(Qres, err){
                console.log('Executing all-users query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.post('/set-admin/', upload.array(), function(req, res) {
    var id_token = req.body.id_token;
    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute set-admin query');
            db.execQuery('SELECT set_admin_status(auth := $1, u_id := $2, admin := $3)',
                         [id, req.body.u_id, req.body.admin], function(Qres, err){
                console.log('Executing admin query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.post('/login/', upload.array(), function (req, res){
    console.log(req.body);
    var id_token = req.body.id_token;
    console.log("Logging in user");
    authenticate.getUserInfoFromID(id_token, function(error, info) {
        console.log(info);
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            db.execQuery("SELECT login(auth := $1, fname := $2, lname := $3)",
                         info,
                         function(Qres, err){
                             if (err) {
                                 res.send(err);
                             } else {
                                 res.send(JSON.stringify(Qres.rows));
                             }
                         });
        }
    });
});

router.get('/creators/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_creators()', [], function(Qres, err){
        console.log('Executing all-creators query');
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(Qres.rows));
        }
    });
});

router.post('/', upload.array(), function (req, res){

    db.execQuery('SELECT create_user(new_name := $1, is_admin := $2, auth := $3)',
                 [req.body.name, req.body.is_admin, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Created user');
                         res.send(Qres);
                     }
                 });
});

router.put('/', upload.array(), function (req, res){

    db.execQuery('SELECT update_user(u_id := $1, is_admin := $2, new_name := $3, new_bio := $4)',
                 [req.body.u_id, req.body.is_admin, req.body.new_name, req.body.new_bio],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Updated user');
                         res.send(Qres);
                     }
                 });
});

router.delete('/', upload.array(), function (req, res){

    db.execQuery('SELECT delete_user(u_id := $1)',
                 [req.body.u_id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Deleted user');
                         res.send(Qres);
                     }
                 });
});

router.get('/creators/search/:term', function (req, res){
    db.execQuery('SELECT * FROM search_creators($1)', [req.params.term], function (Qres, err) {
        if (err) {
            res.send(err);
        } else {
            console.log('Searched creators');
            res.send(Qres);
        }
    });
});

router.get('/admin/auth/:id', function (req, res) {
    var id_token = req.params.id_token;

    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute query');
            db.execQuery('SELECT * FROM get_admins($1)', [id], function(Qres, err){
                console.log('Executing admin query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.get('/listener/auth/:id', function (req, res) {
    var id_token = req.params.id_token;

    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute query');
            db.execQuery('SELECT * FROM get_listeners(auth := $1)', [id], function(Qres, err){
                console.log('Executing admin query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.post('/like/', upload.array(), function(req, res) {
    var id_token = req.body.id_token;

    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            console.log("Got user id", id);
            console.log('About to execute query');
            db.execQuery('SELECT * FROM like($1, $2)', [id, req.body.p_id], function(Qres, err){
                console.log('Executing like query');
                if (err) {
                    res.send(err);
                } else {
                    res.send(JSON.stringify(Qres.rows));
                }
            });
        }
    });
});

router.get('/search/:term/auth/:id', function (req, res){
    var id_token = req.params.id;

    authenticate.exchangeTokenForID(id_token, function(error, id){
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            db.execQuery('SELECT * FROM search_users(term := $1, auth := $2)', [req.params.term, id], function (Qres, err) {
                if (err) {
                    res.send(err);
                } else {
                    console.log('Searched creators');
                    res.send(Qres);
                }
            });
        }
    });
});

router.get('/creators/contributors/podcast/:p_id', function (req, res) {
    db.execQuery('SELECT * FROM get_all_contributors(p_id := $1)', [req.params.p_id], function (Qres, err) {
        if (err) {
            res.send(err);
        } else {
            console.log('Got all contributors');
            res.send(Qres);
        }
    });
});


router.get('/creators/non-contributors/podcast/:p_id/auth/:id_token', function (req, res) {

    var id_token = req.params.id_token;
    var p_id = req.params.p_id;

    authenticate.exchangeTokenForID(id_token, function(error, id) {
        db.execQuery('SELECT * FROM get_non_contributors_on_podcast(p_id := $1, auth := $2)',
         [p_id, id], function (Qres, err) {
            if (err) {
                res.send(err);
            } else {
                console.log('Got all non-contributors');
                res.send(Qres);
            }
        });
    });
});

router.post('/creators/contributor', upload.array(), function(req, res) {
    var id_token = req.body.id_token;
    var c_id = req.body.c_id;
    var p_id = req.body.p_id;

    authenticate.exchangeTokenForID(id_token, function(error, id) {
        db.execQuery('SELECT add_contributor(auth := $1, p_id := $2, c_id := $3)', 
            [id, p_id, c_id], function(Qres, err){
                console.log('Adding contributor');
                if (err) {
                    res.send(err);
                } else {
                    res.send(Qres);
                }
            });
    });
});

router.put('/set/creator', upload.array(), function(req, res) {
    authenticate.exchangeTokenForID(req.body.id_token, function (error, id) {
        db.execQuery('SELECT set_creator_status(u_id := $1, is_creator := $2, auth := $3)',
                     [req.body.u_id, req.body.is_creator, id],
                     function (Qres,err) {
                         if (err) {
                             res.send(err);
                             console.log(err);
                         } else {
                             res.send(Qres);
                         }
                     });
    });
});

module.exports = router;
