const request = require('supertest');
const server  = require('../../server');

describe('GET /', function () {
    it('should render ok', function (done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
});

describe('GET /contact', function () {
    it('should render ok', function (done) {
        request(server)
            .get('/contact')
            .expect(200, done);
    });
});

describe('POST /signup', function () {
    it('should sign a user up and return 201 with the user data', function (done) {

    });
});

describe('verify email', function () {
    it('NEED TEST CASES FOR VERIFIED, ALREADY VERIFIED, NOT POSSIBLE', function () {

    });
});