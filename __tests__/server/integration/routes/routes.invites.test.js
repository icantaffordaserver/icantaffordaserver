/**
 * Created by alexandermann on 2017-01-05.
 */
process.env.NODE_ENV = 'test';
jest.disableAutomock();
const server   = require('../../../../server');
const request  = require('supertest');
const knexfile = require('../../../../knexfile')[process.env.NODE_ENV];
const knex     = require('knex')(knexfile);

describe('Routes: invites', () => {
    beforeAll(async() => {
        await knex.migrate.rollback(); // clear db
        await knex.migrate.latest(); // set up tables
        await knex.seed.run(); // populate DB with seed data
    });

    afterAll(async() => {
        return await knex.migrate.rollback(); // return db to empty state
    });

    describe('GET /invites', () => {
        let response; // globally define the response so we do not make the same request multiple times

        beforeAll(async() => {
            response = await request(server).get('/invites'); // make the GET request
        });

        it('response should have status 200', () => {
            expect(response.status).toBe(200);
        });

        it('response should have type application/json', () => {
            expect(response.type).toBe('application/json');
        });

        it('response body should not be empty (ie. it should contain invites)', () => {
            expect(response.body.data).not.toHaveLength(0);
        });

        it('should have properties: id, email, first_name, last_name, accepted', () => {
            expect(response.body.data[0]).toBeDefined();
            expect(response.body.data[0].id).toBeDefined();
            expect(response.body.data[0].email).toBeDefined();
            // TODO: define all props here
        });

    });

    describe('POST /invites', () => {
        it('should send errors for bad field data', async() => {
            let response = await request(server).post('/invites').send({
                email: 'alexander.mann@',
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a'
            });
            expect(response.status).toBe(400);
        });
        it('should send errors for incomplete field data', async() => {
            let response = await request(server).post('/invites').send({
                email: 'alexander.mann@',
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: ''
            });
            expect(response.status).toBe(400);
        });
        it('should respond with status 201 and "Invitation sent successfully"', async() => {
            let response = await request(server).post('/invites').send({
                email: 'alexander.mann@me.com',
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a'
            });
            expect(response.status).toBe(201);
        });

    });

    describe('PUT /invites/:inviteId', () => {
        it('should send errors for incomplete fields', async() => {
            let inviteId = 'someId';
            let response = await request(server).post('/invites').send({
                email: 'alexander.mann@',
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a'
            });
            expect(response.status).toBe(400);
        })
    });

    describe('Invites - test all basic functionality', () => {
        let testInviteId;

        beforeAll(async() => {
            await knex.migrate.rollback(); // clear db
            await knex.migrate.latest(); // set up tables
            await knex.seed.run(); // add some seed data
            await knex('invites').del(); // clear all the invites data
        });
        it('should check that no invites currently exist', async() => {
            let response = await request(server).get('/invites');
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveLength(0);
        });

        it('POST /invites - should send an invite', async() => {
            let response = await request(server).post('/invites').send({
                email: 'alexander.mann@me.com',
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a'
            });
            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.msg).toBe('Invitation sent successfully.');

            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.first_name).toBeDefined();
            expect(response.body.data.last_name).toBeDefined();
            expect(response.body.data.accepted).toBe(false);
            expect(response.body.data.sent_by_user_account_id).toBe('682fdee0-78d4-42fc-9e56-b865e519912a');
            expect(response.body.data.created_at).toBeDefined();
            expect(response.body.data.updated_at).toBeDefined();
        });

        it('GET /invites - should get all invites (there should only be one)', async() => {
            let response = await request(server).get('/invites');
            expect(response.body.status).toBe('success');

            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].id).toBeDefined();
            expect(response.body.data[0].email).toBe('alexander.mann@me.com');
            expect(response.body.data[0].first_name).toBe('Alexander');
            expect(response.body.data[0].last_name).toBe('Mann');
            expect(response.body.data[0].accepted).toBe(false);
            expect(response.body.data[0].sent_by_user_account_id).toBe('682fdee0-78d4-42fc-9e56-b865e519912a');
            expect(response.body.data[0].created_at).toBeDefined();
            expect(response.body.data[0].updated_at).toBeDefined();
            testInviteId = response.body.data[0].id; // save invite id for next test
        });

        it('GET /invites/:inviteId - should get the invite by id', async() => {
            let response = await request(server).get(`/invites/${testInviteId}`);
            expect(response.body.status).toBe('success');

            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe(testInviteId);
            expect(response.body.data.email).toBe('alexander.mann@me.com');
            expect(response.body.data.first_name).toBe('Alexander');
            expect(response.body.data.last_name).toBe('Mann');
            expect(response.body.data.accepted).toBe(false);
            expect(response.body.data.sent_by_user_account_id).toBe('682fdee0-78d4-42fc-9e56-b865e519912a');
            expect(response.body.data.created_at).toBeDefined();
            expect(response.body.data.updated_at).toBeDefined();
        });

        it('PUT /invites/:inviteId - should update the invite', async() => {
            let response = await request(server).put(`/invites/${testInviteId}`).send({
                email: 'alexandermann11@gmail.com', // email is changed
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a'
            });
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.msg).toBe('Invitation info updated successfully.');


            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe(testInviteId);
            expect(response.body.data.email).toBe('alexandermann11@gmail.com');
            expect(response.body.data.first_name).toBe('Alexander');
            expect(response.body.data.last_name).toBe('Mann');
            expect(response.body.data.accepted).toBe(false);
            expect(response.body.data.sent_by_user_account_id).toBe('682fdee0-78d4-42fc-9e56-b865e519912a');
            expect(response.body.data.created_at).toBeDefined();
            expect(response.body.data.updated_at).toBeDefined();
        });

        it('PUT /invites/:inviteId - should update and resend the invite', async() => {
            let response = await request(server).put(`/invites/${testInviteId}`).send({
                email: 'alexander.mann@me.com', // email is changed back to original
                first_name: 'Alexander',
                last_name: 'Mann',
                sent_by_user_account_id: '682fdee0-78d4-42fc-9e56-b865e519912a',
                resend: true
            });
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.msg).toBe('Invitation sent successfully.');

            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe(testInviteId);
            expect(response.body.data.email).toBe('alexander.mann@me.com');
            expect(response.body.data.first_name).toBe('Alexander');
            expect(response.body.data.last_name).toBe('Mann');
            expect(response.body.data.accepted).toBe(false);
            expect(response.body.data.sent_by_user_account_id).toBe('682fdee0-78d4-42fc-9e56-b865e519912a');
            expect(response.body.data.created_at).toBeDefined();
            expect(response.body.data.updated_at).toBeDefined();
        });


        it('GET /invites/:inviteId/resend - should resend the invite', async() => {
            let response = await request(server).get(`/invites/${testInviteId}/resend`)
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.msg).toBe('Invitation sent successfully.')
        });

        it('DELETE /invites/:inviteId - should delete the invite', async() => {
            let response = await request(server).delete(`/invites/${testInviteId}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.msg).toBe('Invite deleted successfully.');

        });
    })
});