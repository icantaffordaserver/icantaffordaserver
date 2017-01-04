process.env.NODE_ENV = 'test';

const request = require('supertest');
const server  = require('../../index');
const knex    = require('knex')(require('../../knexfile'));

describe('Invites route handling', function () {
    // before each test roll database back to initial state
    beforeEach(function () {
        return knex.migrate.rollback()
            .then(function () {
                return knex.migrate.latest();
            });
    });

    // return database to empty at the end of the testing
    afterEach(function () {
        return knex.migrate.rollback();
    });

    it('GET /invites should return all the invites in the DB in JSON', (done) => {
        request(server)
            .get('/invites')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    // it('POST /invites should add an invite to the DB', function (done) {
    //     request(server)
    //         .get('/')
    //         .expect(200, done);
    // });
    //
    // it('DELETE /invites/:id should delete an invite from the DB', function (done) {
    //     request(server)
    //         .get('/')
    //         .expect(200, done);
    // });
});