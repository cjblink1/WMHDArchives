var pg = require('pg');

var config = {
    user: 'node',
    database: 'WMHDatabase',
    password: '12345',
    host: 'archives.cjblink1.pro',
    max: 30,
    idleTimeoutMillis: 60000
};

var pool = new pg.Pool(config);

exports.execQuery = function (query, params, callback) {
    console.log('Connecting to pool client');
    pool.connect(function (err, client, done) {
        if (err) {
            throw err;
        }

        client.query(query, params, function (err, result) {
            if (err) {
                console.log(JSON.stringify(err));
                throw err;
            }

            callback(result);

            done(err);
        });
    });
};
