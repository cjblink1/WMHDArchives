var util = require('util');
var express = require('express');
var router = express.Router();
var db = require('./database');

router.get('/', function (req, res){
    console.log('About to execute query');
    db.execQuery('SELECT * FROM get_all_podcasts()', function(Qres){
        console.log('Executing all-podcasts query');
        res.send(JSON.stringify(Qres.rows));
    });
});

router.post('/create/name/:name/description/:description', function (req, res){
    console.log('Podcast post request');
    var inStr = util.format('SELECT create_podcast(new_name := \'%s\', new_description := \'%s\')',
                            req.params.name, req.params.description);
    console.log(inStr);
    db.execQuery(inStr, function(Qres) {
        console.log('Created podcast');
        res.send(Qres);
    });
});

router.put('/update/id/:id/name/:name/description/:description', function (req, res){
    console.log('Podcast put request');
    var inStr = util.format('SELECT update_podcast(p_id := %d, new_name := \'%s\', new_description := \'%s\')',
                            req.params.id,req.params.name, req.params.description);
    console.log(inStr);
    db.execQuery(inStr, function(Qres) {
        console.log('Updated podcast');
        res.send(Qres);
    });
});

router.delete('/delete/id/:id/', function (req, res){
    console.log('Podcast delete request');
    var inStr = util.format('SELECT delete_podcast(p_id := %d)',
                            req.params.id);
    console.log(inStr);
    db.execQuery(inStr, function(Qres) {
        console.log('Deleted podcast');
        res.send(Qres);
    });
});

module.exports = router;
