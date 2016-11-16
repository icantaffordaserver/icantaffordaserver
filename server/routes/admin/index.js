const adminRouter = require('express').Router();
const emailsSent  = require('../../models/emails_sent').emailsSent;
const mail        = require('../../api/mail');


adminRouter.get('/', function (req, res, next) {
    emailsSent.getAll().then(function (emails) {
        res.render('admin', {
            data: emails.toJSON()
        });
    });
});

adminRouter.post('/send/:template', function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    var mailInfo = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        matchFirstName: req.body.match_first_name || null,
        matchLastName: req.body.match_last_name || null,
        connectionId: req.body.connection_id || null,
        timeOfShift: req.body.timeOfShift || null
    };

    // promise chain, wait until email is sent then store to database
    mail.sendEmail(req.params.template, mailInfo).then(function () {

        return emailsSent.emailSent(req.body.first_name, req.body.last_name, req.body.email, req.params.template)

    }).then(function (data) {
        console.log('DB store completed!');
    });

    res.redirect('/admin');
});

module.exports = adminRouter;