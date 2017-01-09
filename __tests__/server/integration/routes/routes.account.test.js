/**
 * Created by alexandermann on 2017-01-05.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();
const server   = require('../../../../server');
const request  = require('supertest');
const knexfile = require('../../../../knexfile')[process.env.NODE_ENV];
const knex     = require('knex')(knexfile);

describe('Routes: account related functions', () => {
    beforeAll(async() => {
        await knex.migrate.rollback(); // clear db
        await knex.migrate.latest(); // set up tables
        await knex.seed.run(); // populate DB with seed data
    });

    afterAll(async() => {
        return await knex.migrate.rollback(); // return db to empty state
    });

    describe('POST /signup - sign a user up', () => {
        it('should not allow any signups because signups are *INVITE ONLY*', () => {

        })
    });

    describe('POST /signup/invite/:inviteId - sign a user up with an invite code', () => {

        let response; // globally define the response so we do not make the same request multiple times

        beforeAll(async() => {
            //make sure seed data, aka invite is there
            response = await request(server).get('/invites'); // make the GET request
            console.log('Hello');
            // console.log(response.body);
        });

        it('response should have status 200', () => {
            expect(response.status).toBe(200);
        });

        it('response should have type application/json', () => {
            expect(response.type).toBe('application/json');
        });

        it('response body should not be empty (ie. it should contain invites)', () => {
            expect(response.body).not.toHaveLength(0);
        });

        it('should have properties: id, email, first_name, last_name, accepted', () => {
            console.log('test last');
            expect(response.body[0]).toBeDefined();
            expect(response.body[0].id).toBeDefined();
            expect(response.body[0].email).toBeDefined();
            expect(response.body[0].email).toBe('alex@me.com');
            // TODO: define all props here
        });

    });

});