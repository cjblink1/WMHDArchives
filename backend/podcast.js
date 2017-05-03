var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

router.get('/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_all_podcasts()', [], function(Qres, err){
        console.log('Executing all-podcasts query');
        res.send(JSON.stringify(Qres.rows));
    });
});

router.post('/', upload.array(), function (req, res){

    var inStr = util.format('Podcast post request: SELECT create_podcast(new_name := \'%s\', new_description := \'%s\')',
                            req.body.name, req.body.description);
    console.log(inStr);

    db.execQuery('SELECT create_podcast(new_name := $1, new_description := $2)',
                 [req.body.name, req.body.description],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Created podcast');
                         res.send(Qres);
                     }
                 });
});

router.put('/', upload.array(), function (req, res){
    var inStr = util.format('Podcast put request: SELECT update_podcast(p_id := %d, new_name := \'%s\', new_description := \'%s\')',
                            req.body.id,req.body.name, req.body.description);
    console.log(inStr);

    db.execQuery('SELECT update_podcast(p_id := $1, new_name := $2, new_description := $3)',
                 [req.body.id, req.body.name, req.body.description],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Updated podcast');
                         res.send(Qres);
                     }
                 });
});

router.delete('/', upload.array(), function (req, res){
    var inStr = util.format('Podcast delete request, SELECT delete_podcast(p_id := %d)',
                            req.body.id);
    console.log(inStr);

    db.execQuery('SELECT delete_podcast(p_id := $1)',
                 [req.body.id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Deleted podcast');
                         res.send(Qres);
                     }
                 });
});

module.exports = router;
