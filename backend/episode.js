var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

router.get('/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_episodes()', [], function(Qres, err){
        console.log('Executing all-episodes query');
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(JSON.stringify(Qres.rows));
        }
    });
});

router.post('/', upload.array(), function (req, res){

    /*var inStr = util.format('Episode post request: SELECT create_episode(new_name := \'%s\', new_description := \'%s\')',
                            req.body.name, req.body.description);
    console.log(inStr);*/

    db.execQuery('SELECT create_episode(podcast := $1, description := $2, length := $3, title := $4, date_published := $5, auth := $6)',
                 [req.body.podcast, req.body.description, req.body.length, req.body.title, req.body.date_published, req.body.auth],
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
    /*var inStr = util.format('Episode put request: SELECT update_episode(d := %d, new_name := \'%s\', new_description := \'%s\')',
                            req.body.id,req.body.name, req.body.description);
    console.log(inStr);*/

    db.execQuery('SELECT update_episode(episode_id := $1, creator := $2, podcast := $3, description := $4, length := $5, title := $6, date_published := $6, auth := $7)',
                 [req.body.episode_id, req.body.creator, req.body.podcast, req.body.description, req.body.length, req.body.title, req.body.date_published, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Updated episode');
                         res.send(Qres);
                     }
                 });
});

router.delete('/', upload.array(), function (req, res){
    var inStr = util.format('Episode delete request, SELECT delete_podcast(episode_id := %d, auth := \'%s\')',
                            req.body.id, req.body.auth);
    console.log(inStr);

    db.execQuery('SELECT delete_episode(episode_id := $1, auth := $2)',
                 [req.body.episode_id, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Deleted episode');
                         res.send(Qres);
                     }
                 });
});

router.get('/p_id/:id', function(req, res){
    var inStr = util.format('Episode request, SELECT get_episodes_of_podcast(p_id := %d)',
                            req.params.id);
    console.log(inStr);

    db.execQuery('SELECT * FROM get_episodes_of_podcast(p_id := $1)',
                 [req.params.id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Got podcast', req.params.id);
                         res.send(JSON.stringify(Qres.rows));
                     }
                 });

    
});

module.exports = router;
