/**
 * Created by AlexanderMann on 2016-10-08.
 */
var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');
// Keep this here until we decide to use it
var sendgridApiKey = "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";
var url = require('url');

var smtpConfig = {
    service: 'Gmail',
    auth: {
        user: 'shiftconnectionsinc@gmail.com',
        pass: 'shiftwith*us'
    }
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email server is ready to take our messages');
    }
});

var sendVerificationEmail = function (email, token) {
    var verHref = 'http://localhost:3000/users/verify?email=' + email + '&emailVerToken=' + token;
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Do Not Reply" <shiftconnectionsinc@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Verify your Email', // Subject line
        text: 'Hello world 🐴', // plaintext body
        html: '<b>Hello world 🐴</b><br/><strong>please verify your email by clicking </strong><a href="' + verHref + '">here</a>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

};

module.exports = sendVerificationEmail;