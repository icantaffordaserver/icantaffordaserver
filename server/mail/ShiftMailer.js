// # Mail
// Handles sending email for Shift
var _          = require('lodash'),
    Promise    = require('bluebird'),
    nodemailer = require('nodemailer'),
    validator  = require('validator'),
    config     = require('../config');

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
        transport = config.get('mail');
    }

    // Ghost implementation
    // this.state             = {};
    // this.transport         = nodemailer.createTransport(transport, options);
    // this.state.usingDirect = transport === 'direct';


    // Shift implementation
    // TODO incorporate the options object referencing from config
    this.transport = nodemailer.createTransport(transport);
}

ShiftMailer.prototype.from = function () {
    // Ghost implementation
    // var from = config.get('mail') && (config.get('mail').from || config.get('mail').fromaddress),
    //     defaultBlogTitle;
    //
    // // If we don't have a from address at all
    // if (!from) {
    //     // Default to ghost@[blog.url]
    //     from = 'ghost@' + this.getDomain();
    // }
    //
    // // If we do have a from address, and it's just an email
    // if (validator.isEmail(from)) {
    //     defaultBlogTitle = config.get('theme').title ? config.get('theme').title : i18n.t('common.mail.title', {domain: this.getDomain()});
    //
    //     from = '"' + defaultBlogTitle + '" <' + from + '>';
    // }

    var from = '"The Shift Team" <shiftconnectionsinc@gmail.com>';

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
