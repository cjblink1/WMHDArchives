var pg = require('pg');

var config = {
    user: 'node',
    database: 'test',
    password: '12345',
    host: 'archives.cjblink1.pro',
    max: 10,
    idleTimeoutMillis: 60000
};

var pool = new pg.Pool(config);

exports.execQuery = function (query, callback) {
    console.log('Connecting to pool client');
    pool.connect(function (err, client, done) {
        if (err) {
            throw err;
        }

        client.query(query, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);

            done(err);
        });
    });
};
