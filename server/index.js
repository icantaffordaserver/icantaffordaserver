import express from 'express';
import path from 'path';
import logger from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Router, {RouterContext, match} from 'react-router';
import {Provider} from 'react-redux';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import request from 'request';
import sass from 'node-sass-middleware';
import webpack from 'webpack';
import remoteDev from 'remotedev-server';
import config from '../webpack.config';

// Load environment variables from .env file
dotenv.load();

// Models
var UserAccounts = require('./models/UserAccounts').UserAccounts;

import serverRoutes from './routes';

// React and Server-Side Rendering
import routes from '../client/admin/routes';
import configureStore from '../client/admin/store/configureStore';

var app = express();

var compiler = webpack(config);

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        ifeq: function (a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        toJSON: function (object) {
            return JSON.stringify(object);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(compression());
app.use(sass({src: path.join(__dirname, '..', 'public'), dest: path.join(__dirname, '..', 'public')}));
app.use(logger('dev')); // use the 'dev' morgan configuration for logging HTTP requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator()); // for asserting and checking submission data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

// attach an isAuthenticated function to the req object
app.use(function (req, res, next) {
    req.isAuthenticated = function () {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        new UserAccounts({id: payload.sub})
            .fetch()
            .then(function (user) {
                req.user = user.toJSON();
                next();
            });
    } else {
        next();
    }
});

if (app.get('env') === 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    remoteDev({hostname: 'localhost', port: 8000});
}

app.use('/', serverRoutes);

// React server rendering
app.use(function (req, res) {
    var initialState = {
        auth: {token: req.cookies.token, user: req.user},
        messages: {}
    };

    var store = configureStore(initialState);

    match({routes: routes(store), location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).end(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
            res.render('layouts/main', {
                html: html,
                initialState: store.getState()
            });
        } else {
            res.status(404).end('Not Found.');
        }
    });
});

// Production error handler
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

module.exports = app;
