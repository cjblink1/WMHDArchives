var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

router.get('/podcast/:p_id', function (req, res) {
    db.execQuery('SELECT * FROM get_genres_of_podcast(p_id := $1)',
                    [req.params.p_id],
                    function (Qres, err) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send(Qres);
                        }
                    });
});

router.get('/', function (req, res) {
    db.execQuery('SELECT * FROM get_all_genres()',
                 [],
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
    db.execQuery('SELECT create_genre( genre_name := $1, auth := $2)',
                 [req.body.genre_name, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});

router.post('/tag', upload.array(), function (req, res) {
    db.execQuery('SELECT tag_podcast_as_genre(p_id := $1, g_id := $2, auth := $3)',
                 [req.body.p_id, req.body.g_id, req.body.auth],
                 function (Qres, err) {
                     if (err) {
                         res.send(err);
                         console.log(err);
                     } else {
                         res.send(Qres);
                     }
                 });
});

