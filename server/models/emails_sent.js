var DB = require('../../db').DB;

var emailsSent = DB.Model.extend({
    tableName: 'emails_sent',
    idAttribute: 'id'
}, {
    // Static methods
    getAll: function () {
        return this.fetchAll();
    },

    emailSent: function (name, email, template) {
        return new this({
            name: name,
            email: email,
            template: template
        }).save();
    }
});

module.exports = {
    emailsSent: emailsSent
};