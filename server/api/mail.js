var mail = require('../mail'),
    mailer,
    apiMail;

function sendMail(message) {
    if (mailer instanceof mail.ShiftMailer === false) {
        mailer = new mail.ShiftMailer();
    }
    return mailer.send(message);
}


apiMail = {

    // takes a template name as a string and a mailinfo object containing data to be replaced in the template
    sendEmail: function (template, mailInfo) {
        var options,
            subject,
            message;

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
                subject = 'You have received your Shift Match!';
                options = {
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
                subject = 'Your upcoming Shift: Today is the day!';
                options = {
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
                subject = 'Your Reflection Document is in!';
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
        }

        message = {};

        return mail.utils.generateContent(options).then(function (email) {
            message.to = mailInfo.email;
            message.subject = subject;
            message.html = email.html;
            // this is a promise
            return sendMail(message);
        });

    }
};

module.exports = apiMail;