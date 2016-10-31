exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del() // Deletes ALL existing entries
        .then(function () { // Inserts seed entries one by one in series
            return knex('users').insert({
                email: 'alexander.mann@me.com',
                username: 'spacecraft20',
                password: '$2a$10$8Qq2co.qEvIA.3ywCZti...NdQK7w3YsjDu6kKRLSWo2BQ.I7MKpq',
                email_verified: true
            });
        }).then(function () {
            return knex('users').insert({
                email: 'blake@shiftwith.us',
                username: 'balakalay',
                password: '$2a$10$51MfOo5229eRiRDzBqe94e4OEsykf1v0sFwuO1u/RhH017y4cnIi.',
                email_verified: true
            });
        }).then(function () {
            return knex('users').insert({
                email: 'daniel@shiftwith.us',
                username: 'dthomp',
                password: '$2a$10$51MfOo5229eRiRDzBqe94e4OEsykf1v0sFwuO1u/RhH017y4cnIi.',
                email_verified: true
            });
        })
};