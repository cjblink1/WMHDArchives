var pg = require('pg');
var podcast = require('./podcast');
var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    next();
}

app.use(allowCrossDomain);
app.use('/api/podcast/',podcast);


app.listen(3000, function() {
    console.log('listening on 3000');
});
