/**
 * Created by alexandermann on 2017-01-04.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();
const server   = require('../../../../server');
const request  = require('supertest');
const knexfile = require('../../../../knexfile')[process.env.NODE_ENV];
const knex     = require('knex')(knexfile);

describe('Routes: users', () => {
    beforeAll(async() => {
        await knex.migrate.rollback(); // clear db
        await knex.migrate.latest(); // set up tables
        await knex.seed.run(); // populate DB with seed data
    });

    afterAll(async() => {
        await knex.migrate.rollback(); // return db to empty state
    });

    describe('GET /users - return a collection of users', () => {
        let response; // globally define the response so we do not make the same request multiple times

        beforeAll(async() => {
            response = await request(server).get('/users'); // make the GET request
        });

        it('response should have status 200', () => {
            expect(response.status).toBe(200);
        });

        it('response should have type application/json', () => {
            expect(response.type).toBe('application/json');
        });

        it('response should have status message: "success"', () => {
            expect(response.body.status).toBe('success');
        });

        it('response body data object should not be empty (ie. it should contain users)', () => {
            expect(response.body.data).not.toHaveLength(0);
        });

        it('a user object should have properties: email, profile', () => {
            expect(response.body.data[0]).toBeDefined();
            expect(response.body.data[0].email).toBeDefined();
            expect(response.body.data[0].profile).toBeDefined();
            // TODO: define all props here
        });

    });

    describe('GET /users/:id - return a user by their id', () => {
        let response;

        beforeAll(async() => {
            let userId = '48244142-7761-4982-A808-4B27E8BD1BD7';
            response = await request(server).get(`/users/${userId}`);
        });

        it('response should have status 200', () => {
            expect(response.status).toBe(200);
        });

        it('response should be type application/json', () => {
            expect(response.type).toBe('application/json');
        });

        it('response should have body status "success"', () => {
            expect(response.body.status).toBe('success');
        });

        it('response body should have property "email" with value "alexander.mann@me.com"', () => {
            expect(response.body.data.email).toBe('alexander.mann@me.com');
        });
        it('response body should have property "profile.first_name" with value "Alexander"', () => {
            expect(response.body.data.profile.first_name).toBe('Alexander');
        });
    });

    // TODO: describe error cases

    // describe('GET /users/:token/verify', () => {
    //
    // });
    //
    // describe('POST /signup', () => {
    //
    // });
    //
    // describe('PUT /account', () => {
    //
    // });
    //
    // describe('DELETE /account', () => {
    //
    // });

});