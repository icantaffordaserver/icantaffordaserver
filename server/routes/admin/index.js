const adminRouter = require('express').Router();

adminRouter.get('/', function (req, res, next) {
    res.render('admin', {
        // Temporary template data to see how the table would render it
        date: ['Jan 1, 2016'],
        name: ['Alex Mann'],
        email: ['alexander.mann@me.com'],
        template: ['Phone Call Completed']
    });
});

module.exports = adminRouter;