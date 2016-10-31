exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('profile_data').del()
        .then(function () { // Inserts seed entries one by one in series
            return knex('profile_data').insert({
                users_id: 1,
                last_name: 'Mann',
                first_name: 'Alexander',
                country: 'Canada'
            });
        }).then(function () {
            return knex('profile_data').insert({
                users_id: 2,
                last_name: 'Fletcher',
                first_name: 'Blake',
                country: 'United States'
            });
        }).then(function () {
            return knex('profile_data').insert({
                users_id: 3,
                last_name: 'Thompson',
                first_name: 'Daniel',
                country: 'Netherlands'
            });
        })
};