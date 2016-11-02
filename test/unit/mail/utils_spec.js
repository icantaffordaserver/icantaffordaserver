var sinon   = require('sinon'),
    should  = require('should'),
    mail    = require('../../../server/mail'),
    sandbox = sinon.sandbox.create();

describe('Mail: Utils', function () {
    var scope = {shiftMailer: null};

    beforeEach(function () {
        scope.shiftMailer = new mail.ShiftMailer();

        // replace the shiftMailer.transport.sendMail() function so that it does not actually send mail
        // we are not testing the ability to send mail here, just the ability to generate content
        sandbox.stub(scope.shiftMailer.transport, 'sendMail', function (message, finished) {
            // console.log(message); // if we wanted, we can uncomment this and see the message printed to the console
            finished();
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('generates confirm email', function (done) {
        mail.utils.generateContent({
            template: 'confirm-email',
            data: {
                url: 'shifturl.com/verify?id=1234567890'
            }
        }).then(function (result) {
            should.exist(result);
            result.html.should.containEql('shifturl.com/verify?id=1234567890');
            return scope.shiftMailer.send({
                to: 'johndoe@example.com',
                subject: 'lol',
                html: result.html,
                text: result.text
            });
        }).then(function () {
            done();
        }).catch(done);
    });
});