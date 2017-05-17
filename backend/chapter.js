var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

router.get('/episode/:e_id', function (req, res) {
    db.execQuery('SELECT * FROM get_chapters_of_episode(e_id := $1)',
                 [req.params.e_id],
                 function (Qres, err) {
                     if (err) {
                         res.send(err);
                         console.log(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});

router.post('/', upload.array(), function (req, res) {
    db.execQuery('SELECT create_chapter(new_time := $1, title := $2, e_id := $3, auth := $4)',
                 [req.body.new_time, req.body.title, req.body.e_id, req.body.auth],
                 function (Qres, err) {
                     if (err) {
                         res.send(err);
                         console.log(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});

router.put('/', upload.array(), function (req, res) {
    db.execQuery('SELECT update_chapter(chap_id := $1, new_time := $2, title := $3, auth := $4)',
                 [req.body.chap_id, req.body.new_time, req.body.title, req.body.auth],
                 function (Qres, err) {
                     if (err) {
                         res.send(err);
                         console.log(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});

router.delete('/', upload.array(), function (req, res) {
    db.execQuery('SELECT delete_chapter(chap_id := $1, auth := $2)',
                 [req.body.chap_id, req.body.auth],
                 function (Qres, err) {
                     if (err) {
                         res.send(err);
                         console.log(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});
