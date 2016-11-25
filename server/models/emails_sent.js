var DB = require('../../db').DB;

var emails = DB.Model.extend({
    tableName: 'emails_sent',
    idAttribute: 'id'
}, {
    // Static methods
    getAll: function () {
        return this.fetchAll();
    },

    // Execute this function after an email has successfully been sent
    // This saves it's record in the DB
    emailSent: function (firstName, lastName, email, template) {
        return new this({
            first_name: firstName,
            last_name: lastName,
            email: email,
            template: template
        }).save();
    }
});

module.exports = {
    emails: emails
};