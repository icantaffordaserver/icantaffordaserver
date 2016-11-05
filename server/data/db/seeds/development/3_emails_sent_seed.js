exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('emails_sent').del()
        .then(function () { // Inserts seed entries one by one in series
            return knex('emails_sent').insert({
                name: 'Alexander Mann',
                email: 'alexander.mann@me.com',
                template: 'Profile Building'
            });
        }).then(function () {
            return knex('emails_sent').insert({
                name: 'Blake Fletcher',
                email: 'blake@shiftwith.us',
                template: 'Pre Connection'
            });
        }).then(function () {
            return knex('emails_sent').insert({
                name: 'Daniel Thompson',
                email: 'daniel@shiftwith.us',
                template: 'Post Connection'
            });
        })
};