/**
 * Created by alexandermann on 2016-11-10.
 */
var fs         = require('fs'),
    readline   = require('readline'),
    google     = require('googleapis'),
    googleAuth = require('google-auth-library'),
    Promise    = require('bluebird'),
    path       = require('path'),

    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/drive-nodejs-quickstart.json
    SCOPES     = [
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.photos.readonly',
        'https://www.googleapis.com/auth/drive.readonly'
    ],
    client_secret,
    oauth2Client; // Globally define the oauth2Client

/**
 * Read in the secret.json and parse the data to a global variable.
 * Provides an init callback as all functions need to make sure that the
 * client_secret is initialized and loaded before making any requests.
 *
 * @param {function} callback The callback to call with the authorized client.
 */
function init(callback) {
    // Load client secrets from a local file, make sure this completes before any files are API services are run
    fs.readFile(__dirname + '/client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        client_secret = JSON.parse(content);
        console.log((JSON.parse(process.env.GDRIVE_TOKEN)));
        // Get the client secret, then call the Drive API.
        // THIS MUST COMPLETE FIRST BEFORE API CALLS CAN BE MADE!!
        typeof callback === 'function' && callback(); //check if callback exists
    });
}
init();

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(callback) {
    var cb = callback;
    // make sure client secret has been read in
    if (client_secret === undefined) {
        init(function () {
            authNow(cb);
        })
    } else {
        authNow(cb);
    }

    function authNow(callback) {
        var clientSecret = client_secret.installed.client_secret;
        var clientId     = client_secret.installed.client_id;
        var redirectUrl  = client_secret.installed.redirect_uris[0];
        var auth         = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        // fs.readFile(TOKEN_PATH, function (err, token) {
        //     if (err) {
        //         getNewToken(oauth2Client, callback);
        //     } else {
        //         oauth2Client.credentials = JSON.parse(token);
        //
        //         callback(oauth2Client);
        //     }
        // });

        oauth2Client.credentials = JSON.parse(process.env.GDRIVE_TOKEN); // set the credentials to the token received previously
        callback(oauth2Client);
    }

}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(name, template) {

    var service = google.drive('v3');
    return new Promise(function (resolve, reject) {
        authorize(function (auth) {
            service.files.list({
                auth: auth,
                q: "name contains '" + name + " " + template + "' and mimeType contains 'application/pdf'", // TODO fix this make dynamic
                pageSize: 100,
                orderBy: 'createdTime',
                fields: "nextPageToken, files(id, name, createdTime)"
            }, function (err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    reject(err);
                } else {
                    var files = response.files;
                    if (files.length == 0) {
                        console.log('No files found.');
                    } else {
                        console.log('Files:');
                        // Hide printing to console for now
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i];
                            console.log('%s (%s) - %s', file.name, file.id, file.createdTime);
                        }
                        resolve(files);
                    }
                }
            });
        });
    });

}

/**
 * Downloads a file from google drive
 *
 * @param {string} fileId The id to a given file in a users Google Drive.
 */
function downloadAttachment(fileId) {
    var service  = google.drive('v3');

    // wrap in a promise to conform with rest of API using promises
    return new Promise(function (resolve, reject) {
        // make sure we are authorized then execute downloadAttachment
        authorize(function (auth) {
            service.files.get({
                auth: auth,
                fileId: fileId,
                alt: 'media'
            }, {
                encoding: null // make sure that we get the binary data
            }, function (err, buffer) {
                if (err) reject(err);
                else resolve(buffer);

                // Could have turn this into a callback function by doing below..
                // console.log(buffer);
                // // check if callback is function, if not do not call..
                // typeof callback === 'function' && callback(buffer);
            });
            // If we want to save the file somewhere on the system
            // .on('data', function (chunk) {
            //     respData += chunk;
            // })
            // .on('end', function () {
            //     // console.log(respData); // returns us the token - NOT WHAT WE WANT
            //     console.log('Done');
            // })
            // .on('error', function (err) {
            //     console.log('Error during downloadAttachment', err);
            // })
            // .pipe(dest);
        })
    })


}

module.exports = {
    downloadAttachment: downloadAttachment,
    listFiles: listFiles
};