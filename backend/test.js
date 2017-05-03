var pg = require('pg');
var podcast = require('./podcast');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/api/podcast/',podcast);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function() {
    console.log('listening on 3000');
});
