const adminRouter = require('express').Router();
const emailsSent = require('../../models/emails_sent').emailsSent;



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
    emailsSent.emailSent(req.body.name, req.body.email, req.params.template).then(function (data) {
    });
    res.redirect('/admin');
});

module.exports = adminRouter;