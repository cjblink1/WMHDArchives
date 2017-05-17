var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var authenticate = require('./authenticate');

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
/*
    if(!req.files){
        console.log('No file attached');
        res.send('No file attached');
        return;
    }
    var podcastFile = req.files.podcastFile;
*/
    db.execQuery('SELECT create_episode(podcast := $1, description := $2, length := $3, title := $4, date_published := $5, auth := $6)',
                 [req.body.podcast, req.body.description, req.body.length, req.body.title, req.body.date_published, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Created podcast');
                         res.send(Qres);
/*
                         podcastFile.mv('/podcasts/'+req.body.podcast+'/'+Qres.rows[0].create_episode+'.mp4/', function (error) {
                             if (error) {
                                 console.log(error);
                                 res.send(error);
                                 // Undo previous insertion if file is not properly moved
                                 db.execQuery('SELECT delete_episode(e_id := $1, auth := $2)', [Qres.rows[0].create_episode, req.body.auth], function (Qres, err) {
                                     if (err) {
                                         res.send(err);
                                     }
                                 });
                                 return;*/
                     }
                     console.log('File uploaded and stored');
                 });
});
//                 });
//});

router.put('/', upload.array(), function (req, res){

    db.execQuery('SELECT update_episode(episode_id := $1, creator := $2, podcast := $3, description := $4, length := $5, title := $6, date_published := $6, auth := $7)',
                 [req.body.episode_id, req.body.creator, req.body.podcast, req.body.description, req.body.length, req.body.title, req.body.date_published, req.body.auth],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Updated episode');
                         res.send(Qres);
                         if (req.files.podcastFile) {
                             var podcastFile = req.files.podcastFile;
                             podcastFile.mv('/podcasts/'+req.body.podcast+'/'+req.body.episode_id+'.mp4/', function (error) {
                                 if (error) {
                                     console.log(error);
                                     res.send(error);
                                 }
                             });
                         }
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

router.get('/p_id/:p_id/auth/:id_token', function(req, res){
    var p_id = req.params.p_id;
    var id_token = req.params.id_token;

    if (id_token === null) {
        db.execQuery('SELECT * FROM get_episodes_of_podcast(p_id := $1, auth := null)',
                 [p_id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Got episodes of podcast', p_id);
                         res.send(Qres);
                     }
                 });
    } else {
        authenticate.exchangeTokenForID(id_token, function(error, id) {
            db.execQuery('SELECT * FROM get_episodes_of_podcast(p_id := $1, auth := $2)',
                 [p_id, id],
                 function(Qres, err) {
                     if (err) {
                         res.send(err);
                     } else {
                         console.log('Got episodes of podcast', p_id);
                         res.send(Qres);
                     }
                 });
        });
    }

    

    
});

module.exports = router;
