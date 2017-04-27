var pg = require('pg');
//var http = require('http');
var podcast = require('./podcast');
var express = require('express');
var app = express();

app.use('/podcast',podcast);
app.listen(3000, function() {
    console.log('listening on 3000');
});
