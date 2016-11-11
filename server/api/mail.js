var mail               = require('../mail'),
    fs                 = require('fs'),
    path               = require('path'),
    downloadAttachment = require('../google/google-client').downloadAttachment,
    listFiles          = require('../google/google-client').listFiles,
    mailer,
    apiMail;


/**
 * Send and email
 * Make sure that the ShiftMailer object is initialized
 *
 * @param {object} message The message object to sending an email
 */
function sendMail(message) {
    if (mailer instanceof mail.ShiftMailer === false) {
        mailer = new mail.ShiftMailer();
    }
    return mailer.send(message);
}

/**
 * Gets the file id from the google drive
 * For use with getting either a profile document, pre-connection, post-
 * connection, or review
 *
 * @param {string} fileId The id to a given file in a users Google Drive.
 */
function getAttachmentId(personName, template) {
    return new Promise(function (resolve, reject) {
        listFiles(personName, template).then(function (files) {
            console.log(files[files.length - 1]);
            resolve(files[files.length - 1]); // return the last element of the array because it is the most recent doc
        });
    })
}

apiMail = {

    /**
     * Sends an email and attachment if necessary to the user
     *
     * @param {string} fileId The id to a given file in a users Google Drive.
     */
    // takes a template name as a string and a mailinfo object containing data to be replaced in the template
    sendEmail: function (template, mailInfo) {
        var options,
            subject,
            attachmentRequired,
            attachmentData,
            documentName,
            message = {};

        // based on the email type, setup the options object to generate the content for the email
        switch (template) {
            case 'on-boarding':
                subject = 'Shift Phone Call Recap';
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
            case 'profile-building':
                subject = 'It\'s time to build your Shift Profile';
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
            case 'pre-connection':
                subject            = 'You have received your Shift Match!';
                attachmentRequired = true;
                documentName       = 'profile';
                options            = {
                    template: template,
                    data: {
                        name: mailInfo.name
                        // connectionId: mailInfo.connectionId --- don't think I need this
                    }
                };
                break;
            case 'shift-scheduled':
                subject = 'Your Shift is scheduled';
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name,
                        timeOfShift: mailInfo.timeOfShift
                    }
                };
                break;
            case 'shift-today':
                subject            = 'Your upcoming Shift: Today is the day!';
                attachmentRequired = true;
                documentName       = 'connection guide';
                options            = {
                    template: template,
                    data: {
                        name: mailInfo.name,
                        timeOfShift: mailInfo.timeOfShift
                    }
                };
                break;
            case 'post-connection':
                subject = 'How was your Shift?';
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
            case 'review':
                subject            = 'Your Reflection Document is in!';
                attachmentRequired = true;
                documentName       = 'reflection document';
                options            = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
        }

        if (attachmentRequired) {
            var fileName;
            return getAttachmentId(mailInfo.name, documentName).then(function (file) {
                console.log(file);
                fileName = file.name;
                return downloadAttachment(file.id)
            }).then(function (buffer) {
                attachmentData = buffer.toString('base64');
                return mail.utils.generateContent(options);
            }).then(function (email) {
                message.to              = mailInfo.email;
                message.subject         = subject;
                message.html            = email.html;
                message.mandrillOptions = {
                    message: {
                        attachments: [
                            {
                                type: 'pdf',
                                name: fileName,
                                content: attachmentData
                            }
                        ]
                    }
                };
                // this is a promise
                return sendMail(message);
            }).catch(function (err) {
                console.log(err);
            });

        } else {

            return mail.utils.generateContent(options).then(function (email) {
                message.to              = mailInfo.email;
                message.subject         = subject;
                message.html            = email.html;

                // this is a promise
                return sendMail(message);
            });
        }
    }
};

module.exports = apiMail;