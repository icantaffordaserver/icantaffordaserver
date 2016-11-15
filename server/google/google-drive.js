'use strict';

var google       = require('googleapis');
var GoogleClient = require('./google-authentication');
var fs           = require('fs');

// make sure the credentials are set
GoogleClient.setCredentials();
var auth = GoogleClient.oAuth2Client;

var drive = google.drive({
    version: 'v3',
    auth: auth
});


/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(name, template) {
    return new Promise(function (resolve, reject) {
        drive.files.list({
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

}

/**
 * Downloads a file from google drive
 *
 * @param {string} fileId The id to a given file in a users Google Drive.
 */
function downloadAttachment(fileId) {
    // wrap in a promise to conform with rest of API using promises
    return new Promise(function (resolve, reject) {
        drive.files.get({
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
}


module.exports = {
    downloadAttachment: downloadAttachment,
    listFiles: listFiles
};