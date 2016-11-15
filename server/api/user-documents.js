var clientSecret = "pplteGoz6l2oPyI7RqQfCU3Z";
var clientId     = "100061826755-onevk7kb3j05cjd2r77033e8frtbnup5.apps.googleusercontent.com";
var redirectUrl  = "urn:ietf:wg:oauth:2.0:oob";
var credentials = {
    "access_token": "ya29.Ci-QA70vWDjaPg2nO3HLPi0bvM_3b7dfzzHyF-cqsW66fyruvYub9MSOgXTTzHGKZQ",
    "refresh_token": "1/uRhwtweT24ks1rT69jSAHISE8KmLzWdAj-KI3QJ883bsx3f1MFQdbR3dlCd5_EEE",
    "token_type": "Bearer",
    "expiry_date": 1478584386105
};
var fs = require('fs');

var google = require('googleapis');
var googleAuth = require('google-auth-library');

var auth;
var oauth2Client;


function authorize() {
    auth             = new googleAuth();
    oauth2Client     = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.credentials = credentials;

}

/**
 * Lists the names and IDs of up to 20 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
        auth: auth,
        pageSize: 20,
        fields: "nextPageToken, files(id, name)"
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.files;
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
        }
    });
}

function download(auth) {
    var drive = google.drive('v3');

    var fileId = '0B-L2dQ21PPAKN3ZQVlU1WHAydlU';
    var dest = fs.createWriteStream('/tmp/something.pdf');
    drive.files.get({
        auth: auth,
        fileId: fileId,
        alt: 'media'
    })
        .on('end', function() {
            console.log('Done');
        })
        .on('error', function(err) {
            console.log('Error during downloadAttachment', err);
        })
        .pipe(dest);
}

authorize();
listFiles(oauth2Client);
download(oauth2Client);
// drive.downloadAttachment('0B-L2dQ21PPAKN3ZQVlU1WHAydlU', 'm3KrgzCxjIOe8oDeV107aAIc2mGvY2oQWShMu99g3qY#');