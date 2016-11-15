var google  = require('googleapis'), // create our google service client
    OAuth2  = google.auth.OAuth2,
    secrets = require('./client_secret.json'),

    called  = false;

function callOnce(callback) {
    if (!called) {
        called = true;
        callback();
    }
}

function GoogleClient(options) {
    var self             = this;
    self.isAuthenticated = false;
    this._options        = options || {scopes: []}; // the underscore is a convention to show that the property is not public

    // create an oAuth client to authorize the API call
    this.oAuth2Client = new OAuth2(
        secrets.installed.client_id,
        secrets.installed.client_secret,
        secrets.installed.redirect_uris[0]
    );

    // generate a url to authenticate the user with an array of scopes passed in
    this.url = function (scopes) {
        self.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
    };

    this.getToken = function () {

    };

    this.setCredentials = function () {
        if (!self.isAuthenticated) {
            self.oAuth2Client.credentials = JSON.parse(process.env.GDRIVE_TOKEN);
            self.isAuthenticated = true;
        }
    };

    return self;
}

module.exports = new GoogleClient();