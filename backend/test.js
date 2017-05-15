var pg = require('pg');
var podcast = require('./podcast');
var episode = require('./episode');
var user = require('./user');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fileUploader = require('express-fileupload');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUploader);

app.use(allowCrossDomain);
app.use('/api/podcast/',podcast);
app.use('/api/episode/',episode);
app.use('/api/user/',user);




app.listen(3000, function() {
    console.log('listening on 3000');
});
