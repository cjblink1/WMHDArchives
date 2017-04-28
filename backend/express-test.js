var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', function (req, res) {
  res.send('hello world');
})

app.get('/api');

app.listen(3000, function() {
    console.log('listening on 3000');
});