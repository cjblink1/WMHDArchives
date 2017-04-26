var pg = require('pg');
var http = require('http');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
var server = http.createServer(function(request, response) {
    // connect to our database
    var client = new pg.Client('postgres://node:12345@archives.cjblink1.pro/test');
    client.connect(function (err) {
    if (err) {
      console.log(JSON.stringify(err));
      throw err;
    }

        // execute a query on our database
        client.query('SELECT * From get_all_podcasts()' , function (err, result) {
            if (err) {
              throw err;
            }

            response.end(JSON.stringify(result.rows));

            // just print the result the console
            console.log(result.rows[0].podcast_id); // outputs: { name: 'brianc' }

            // disconnect the client
            client.end(function (err) {
                if (err) throw err;
            });
        });
    });
});

server.listen(3000);
