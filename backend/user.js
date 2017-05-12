var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

router.get('/auth/:id_token', function (req, res){

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

router.get('/listeners/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_listeners()', [], function(Qres, err){
        console.log('Executing all-listeners query');
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(Qres.rows));
        }
    });
});

router.post('/login/', upload.array(), function (req, res){
    console.log(req.body)
    var id_token = req.body.id_token;
    console.log("Logging in user")
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

module.exports = router;
