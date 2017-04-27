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

module.exports = router;
