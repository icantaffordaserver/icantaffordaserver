// # Mail
// Handles sending email for Shift
var _                 = require('lodash'),
    Promise           = require('bluebird'),
    nodemailer        = require('nodemailer'),
    mandrillTransport = require('nodemailer-mandrill-transport'),
    validator         = require('validator'),
    config            = require('../config');

function ShiftMailer(stub) {
    // Ghost Version
    // TODO implement all settings with config as seen in ghost
    // var transport = config.get('mail') && config.get('mail').transport || 'direct',
    //     options   = config.get('mail') && _.clone(config.get('mail').options) || {};

    // check for stub transport, for testing purposes
    var transport;
    if (stub) {
        transport = stub;
    } else {
        transport = transport = mandrillTransport({
            auth: {
                apiKey: 'eIs4JpO2pMXJbEJNb_mroA' //TODO Put this in a config var or env var
            }
        });
    }


    // Shift implementation
    // TODO incorporate the options object referencing from config
    this.transport = nodemailer.createTransport(transport);
}

ShiftMailer.prototype.from = function () {
    var from = '"The Shift Team" <info@shiftwith.us>'; // TODO store in config or env var

    return from;
};

// Moved it to its own module
// ShiftMailer.prototype.getDomain = function () {
//     var domain = config.get('url').match(new RegExp('^https?://([^/:?#]+)(?:[/:?#]|$)', 'i'));
//     return domain && domain[1];
// };

// Sends an email message enforcing `to` (blog owner) and `from` fields
// This assumes that api.settings.read('email') was already done on the API level
ShiftMailer.prototype.send = function (message) {
    var self = this,
        to;

    // important to clone message as we modify it
    message = _.clone(message) || {};
    to      = message.to || false;
    // check to see if message has required properties
    if (!(message && message.subject && message.html && message.to)) {
        return Promise.reject(new Error('Incomplete message error'));
    }

    message = _.extend(message, {
        from: self.from(),
        to: to,
        generateTextFromHTML: true,
        encoding: 'base64'
    });

    return new Promise(function (resolve, reject) {
        self.transport.sendMail(message, function (err, info) {
            if (err) {
                return reject(err);
            }

            return resolve(info);
        });
    });
};

module.exports = ShiftMailer;
