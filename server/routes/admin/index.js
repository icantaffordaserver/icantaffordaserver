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
        name: req.body.name,
        email: req.body.email,
        // connectionId: req.body.connectionId || null, ----- dont think I need this
        timeOfShift: req.body.timeOfShift || null
    };

    // promise, wait until email is sent then store to database
    mail.sendEmail(req.params.template, mailInfo).then(function () {
        emailsSent.emailSent(req.body.name, req.body.email, req.params.template).then(function (data) {
            console.log('DB store completed!');
        });
    });

    res.redirect('/admin');
});

module.exports = adminRouter;