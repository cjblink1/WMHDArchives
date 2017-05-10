const CLIENT_ID = '35773705526-4rbi73014dnca9pc7e367ndugdha99fa.apps.googleusercontent.com';
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();
var client = new auth.OAuth2(CLIENT_ID, '', '');

exports.exchangeTokenForID = function (id_token, callback) {
    client.verifyIdToken(id_token,
                         CLIENT_ID, 
                         function (error, login) {
                             if (error) {
                                 callback(error, null);
                             } else {
                                 var payload = login.getPayload();
                                 callback(null, payload['sub']);
                             }
                         }); 
};

exports.getUserInfoFromID = function (id_token, callback) {
    client.verifyIdToken(id_token,
                         CLIENT_ID,
                         function (error, login) {
                             if (error) {
                                 callback(error, null);
                             } else {
                                 var payload = login.getPayload();
                                 callback(null,
                                          [payload['sub'],
                                           payload['given_name'],
                                           payload['family_name']]);
                             }
                         });
};
