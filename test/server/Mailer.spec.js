/**
 * Created by alexandermann on 2016-12-17.
 */
process.env.NODE_ENV = 'test';

require('dotenv').load(); // load the mandrill api key

const getTemplates = require('../../server/mail/Mailer').getTemplates;
const sendTemplate = require('../../server/mail/Mailer').sendTemplate;

const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
const should = chai.should();

describe('Mandrill Mailer tests...', () => {
    it('Should get the list of available templates', () => {
        return getTemplates().then((result) => {
            expect(result[0].name).to.equal('confirm-email');
        });
    });

    it('Should send the confirm-email template and return a promise', () => {
        const mergeObj = {
            name: 'Alexander',
            email: 'alexander.mann@me.com',
            url: 'http://www.google.com'
        };
        return sendTemplate('confirm-email', mergeObj).then((result)=>{
            expect(result[0].email).to.equal(mergeObj.email);
            expect(result[0].status).to.equal('sent');
        });

    });
});


