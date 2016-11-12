var DB = require('../../db').DB;

var emailsSent = DB.Model.extend({
    tableName: 'emails_sent',
    idAttribute: 'id'
}, {
    // Static methods
    getAll: function () {
        return this.fetchAll();
    },

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
    emailsSent: emailsSent
};