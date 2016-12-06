/**
 * Created by AlexanderMann on 2016-10-18.
 */
process.env.NODE_ENV = 'test';

var chai      = require('chai');
var should    = chai.should();
var expect    = chai.expect;
var supertest = require('supertest');
var app       = require('../server');

var request = supertest(app);
var knex    = require('../server/data/db/knex');

describe('User Sign Up', function () {
    // make sure the database is unchanged after every test
    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done();
                            });
                    });
            });
    });

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            });
    });

    describe('User Registration @ POST /signup', function () {
        it('should return a 302 and redirect to "/"', function (done) {
            request.post('/signup')
                .set('Accept', 'application/x-www-form-urlencoded')
                .send({
                    firstName: 'Alexander',
                    lastName: 'Mann',
                    country: 'Canada',
                    email: 'alexandermann11@gmail.com',
                    password: 'hey12'
                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(302); //here we are using chai's expect method and syntax
                    expect(res.header.location).to.equal('/');
                    done();
                })
        });
    });
});