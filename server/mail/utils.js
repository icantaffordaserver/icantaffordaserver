/**
 * Created by AlexanderMann on 2016-10-25.
 */
var _            = require('lodash').runInContext(),
    fs           = require('fs'),
    Promise      = require('bluebird'),
    path         = require('path'),
    htmlToText   = require('html-to-text'),
    config       = require('../config'),
    templatesDir = path.resolve(__dirname, '..', 'mail', 'templates');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

// generate user specific content for the respective email
// takes an options object which specifies the template html email and the data to be replaced inside the {{ }} braces
// In the below example below, {{url}} is replaced with 'www.example.com' in nameOfHtmlFile.html in the templates directory
// {
//     template: nameOfHtmlFile
//     data: {
//         url: 'www.example.com'
//     }
// }
exports.generateContent = function generateContent(options) {
    var data;

    data = _.defaults(options.data);

    // read the proper email body template
    return Promise.promisify(fs.readFile)(path.join(templatesDir, options.template + '.html'), 'utf8')
        .then(function (content) {
            var compiled,
                htmlContent,
                textContent;

            // insert user-specific data into the email
            compiled    = _.template(content);
            htmlContent = compiled(data);

            // generate a plain-text version of the same email
            textContent = htmlToText.fromString(htmlContent);

            return {
                html: htmlContent,
                text: textContent
            };
        });
};