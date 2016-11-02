var should             = require('should'),
    Promise            = require('bluebird'),

    // Stuff we are testing
    mail               = require('../../../server/mail'),
    config             = require('../../../server/config'),
    configUtils        = require('../../utils/configUtils'),
    stubTransport      = require('nodemailer-stub-transport'),
    mailer,

    // Mock SMTP config
    SMTP               = {
        service: 'Gmail',
        auth: {
            user: 'nil',
            pass: '123'
        }
    },

    // test data
    mailDataNoDomain   = {
        to: 'johndoe@doesnotexist@abc.com',
        subject: 'testemail',
        html: '<p>Hello Test Email</p>'
    },

    mailDataNoServer   = {
        to: 'johndoe@doesnotexist.com',
        subject: 'testemail',
        html: '<p>Hello Test Email</p>'
    },

    mailDataIncomplete = {
        subject: 'testemail',
        html: '<p>Hello Test Email</p>'
    };

describe('Mail: ShiftMailer', function () {
    afterEach(function () {
        mailer = null;

        configUtils.restore();
    });

    it('should attach mail provider to app instance', function () {
        mailer = new mail.ShiftMailer();

        should.exist(mailer);
        mailer.should.have.property('send').and.be.a.Function();
    });

    it('should setup SMTP transport on initialization', function () {
        mailer = new mail.ShiftMailer(SMTP);

        mailer.should.have.property('transport');
        mailer.transport.sendMail.should.be.a.Function();
    });

    it('sends valid message successfully ', function (done) {

        mailer = new mail.ShiftMailer(stubTransport());

        mailer.send(mailDataNoServer).then(function (info) {
            var show = info.response.toString();
            should.exist(info.response.toString());
            should.exist(info.envelope);
            (info.envelope.to).should.containEql('johndoe@doesnotexist.com');

            done();
        }).catch(done);
    });

    it('handles failure', function (done) {

        mailer = new mail.ShiftMailer(stubTransport({
            error: new Error('Stub fucked up')
        }));

        mailer.send(mailDataNoServer).then(function (info) {
            done(new Error('Stub did not error'));
        }).catch(function (error) {
            error.message.should.eql('Error: Stub fucked up');
            done();
        }).catch(done);
    });

    it('should fail to send messages when given insufficient data', function (done) {
        mailer = new mail.ShiftMailer(stubTransport());

        // reflect(), reason(), isFulfilled() are part of bluebird, we use them here for our testing
        Promise.all([
            mailer.send().reflect(),
            mailer.send({}).reflect(),
            mailer.send({subject: '123'}).reflect(),
            mailer.send({subject: '', html: '123'}).reflect()
        ]).then(function (descriptors) {
            descriptors.forEach(function (d) {
                d.isFulfilled().should.be.false();
                d.reason().should.be.an.instanceOf(Error);
                d.reason().message.should.eql('Incomplete message error');
            });
            done();
        }).catch(done);
    });

});
