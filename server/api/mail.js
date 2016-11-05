var mail = require('../mail'),
    apiMail;

apiMail = {
    automatedMailing: function (template, mailInfo) {
        var options;
        // based on the email type, setup the options object to generate the content for the email
        switch (template) {
            case 'on-boarding':
                options = {
                    template: template,
                    data: {
                        name: mailInfo.name
                    }
                };
                break;
            case 'profile-building':

                break;
            case 'pre-connection':

                break;
            case 'post-connection':

                break;
            case 'review':

                break;
        }

        mail.utils.generateContent(options)
    }
};

module.exports = apiMail;