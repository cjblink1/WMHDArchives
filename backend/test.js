var pg = require('pg');
var podcast = require('./podcast');
var express = require('express');
var app = express();

app.use('/api/podcast/',podcast);

app.listen(3000, function() {
    console.log('listening on 3000');
});
