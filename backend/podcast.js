var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

router.get('/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_all_podcasts()', [], function(Qres, err){
        console.log('Executing all-podcasts query');
        res.send(JSON.stringify(Qres.rows));
    });
});

router.post('/', upload.array(), function (req, res){

    var id_token = req.body.id_token;
    var name = req.body.name;
    var description = req.body.description;

    authenticate.exchangeTokenForID(id_token, function (error, id) {
        db.execQuery('SELECT create_podcast(new_name := $1, new_description := $2, auth := $3)',
                 [name, description, id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Created podcast');
                         res.send(Qres);
                     }
                 });
    });
});

router.put('/', upload.array(), function (req, res){

    var id_token = req.body.id_token;
    var name = req.body.name;
    var description = req.body.description;
    var p_id = req.body = req.body.p_id;

    authenticate.exchangeTokenForID(id_token, function (error, id) {
        db.execQuery('SELECT update_podcast(p_id := $1, new_name := $2, new_description := $3, auth := $4)',
                 [p_id, name, description, id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Updated podcast');
                         res.send(Qres);
                     }
                 });
    });
});

router.delete('/p_id/:p_id/auth/:id_token', function (req, res){
    var id_token = req.params.id_token;
    var p_id = req.params.p_id;
    authenticate.exchangeTokenForID(id_token, function(error, id) {
         db.execQuery('SELECT delete_podcast(p_id := $1, auth := $2)',
                 [p_id, id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Deleted podcast');
                         res.send(Qres);
                     }
                 });
    });
});

router.get('/:id', function(req, res) {
    var inStr = util.format('Get podcast request, SELECT get_podcast(p_id := %d)',
                            req.params.id);

    db.execQuery('SELECT * FROM get_podcast(p_id := $1)',
                 [req.params.id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Got podcast', req.params.id);
                         res.send(JSON.stringify(Qres.rows[0]));
                     }
                 });
});

router.get('/search/:terms', function (req, res) {
    db.execQuery('SELECT * FROM search_podcasts(term := $1)', [req.params.terms], function(Qres, err) {
        if(err) {
            res.send(err);
        } else {
            console.log('Searched podcasts');
            res.send(Qres);
        }
    });
});

module.exports = router;
