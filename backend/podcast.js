var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');

router.get('/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_all_podcasts()', [], function(Qres){
        console.log('Executing all-podcasts query');
        res.send(JSON.stringify(Qres.rows));
    });
});

router.post('/create/name/:name/description/:description', function (req, res){

    var inStr = util.format('Podcast post request: SELECT create_podcast(new_name := \'%s\', new_description := \'%s\')',
                            req.params.name, req.params.description);
    console.log(inStr);

    db.execQuery('SELECT create_podcast(new_name := $1, new_description := $2)',
                 [req.params.name, req.params.description],
                 function(Qres) {
                     console.log('Created podcast');
                     res.send(Qres);
                 });
});

router.put('/update/id/:id/name/:name/description/:description', function (req, res){
    var inStr = util.format('Podcast put request: SELECT update_podcast(p_id := %d, new_name := \'%s\', new_description := \'%s\')',
                            req.params.id,req.params.name, req.params.description);
    console.log(inStr);

    db.execQuery('SELECT update_podcast(p_id := $1, new_name := $2, new_description := $3)',
                 [req.params.id, req.params.name, req.params.description],
                 function(Qres) {
                     console.log('Updated podcast');
                     res.send(Qres);
                 });
});

router.delete('/delete/id/:id/', function (req, res){
    var inStr = util.format('Podcast delete request, SELECT delete_podcast(p_id := %d)',
                            req.params.id);
    console.log(inStr);

    db.execQuery('SELECT delete_podcast(p_id := $1)',
                 [req.params.id],
                 function(Qres) {
                     console.log('Deleted podcast');
                     res.send(Qres);
    });
});

module.exports = router;
