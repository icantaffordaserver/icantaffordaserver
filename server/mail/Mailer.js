/**
 * Created by alexandermann on 2016-12-17.
 */
const mandrill = require('mandrill-api/mandrill');
const mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

function getTemplates(label) {
  return new Promise((resolve, reject) => {
    mandrill_client.templates.list({ label }, (result) => {
      resolve(result);
    }, (error) => {
      console.log(`A mandrill error has occurred: ${error.name} - ${error.message}`);
      reject(error);
    });
  });
}


function sendEmail(template, mergeObj) {
    // create the required object for mandrill api
  const mandrillMailObject = {
    template_name: template,
        // don't need this at the moment, see for usage:
        // https://mandrill.zendesk.com/hc/en-us/articles/205582497-Using-Editable-Content-Areas-in-Templates
    template_content: [{
      name: '',
      content: '',
    }],
    message: {
      to: [{
        email: mergeObj.email,
        type: 'to',
      }],
      merge_vars: [{
        rcpt: mergeObj.email,
        vars: [
          {
            name: 'EMAIL',
            content: mergeObj.email,
          },
          {
            name: 'FIRST_NAME',
            content: mergeObj.name,
          },
          {
            name: 'VERIFY_URL',
            content: mergeObj.url,
          },
          {
            name: 'RESET_URL',
            content: mergeObj.url,
          },
          {
            name: 'INVITE_URL',
            content: mergeObj.url,
          },
        ],
      }],
    },
  };

  return new Promise((resolve, reject) => {
    mandrill_client.messages.sendTemplate(mandrillMailObject, (result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

module.exports.getTemplates = getTemplates;
module.exports.sendTemplate = sendEmail;
