const routes = require('express').Router();

// Controllers
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

routes.post('/contact', contactController.contactPost);

routes.put('/account', userController.ensureAuthenticated, userController.accountPut);
routes.delete('/account', userController.ensureAuthenticated, userController.accountDelete);

routes.get('/users/:token/verify', userController.ensureAuthenticated, userController.verifySignUp);

routes.post('/signup', userController.signupPost);

routes.post('/login', userController.loginPost);

routes.post('/forgot', userController.forgotPost);

routes.post('/reset/:token', userController.resetPost);

routes.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);

routes.post('/auth/facebook', userController.authFacebook);
routes.get('/auth/facebook/callback', userController.authFacebookCallback);

module.exports = routes;