/**
 * Created by alexandermann on 2016-12-17.
 */
process.env.NODE_ENV = 'test';

require('dotenv').load(); // load the mandrill api key

const getTemplates = require('../../../server/mail/Mailer').getTemplates;
const sendTemplate = require('../../../server/mail/Mailer').sendTemplate;

describe('Mandrill Mailer tests...', () => {
    it('Should get the list of available templates', async() => {
        let templates = await getTemplates();
        expect(templates[0].name).toBe('confirm-email');
    });

    it('Should send the confirm-email template and return a promise', async() => {
        const mergeObj = {
            name: 'Alexander',
            email: 'alexander.mann@me.com',
            url: 'http://www.google.com'
        };
        let email      = await sendTemplate('confirm-email', mergeObj);
        expect(email[0].email).toBe(mergeObj.email);
        expect(email[0].status).toBe('sent');
    })
});


