import express from 'express';
import path from 'path';
import logger from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Router, { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import exphbs from 'express-handlebars';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import request from 'request';
import sass from 'node-sass-middleware';
import webpack from 'webpack';
import remoteDev from 'remotedev-server';
import config from '../webpack.config.babel';

// Load environment variables from .env file
dotenv.load();

// Models
const UserAccounts = require('./models/UserAccounts').UserAccounts;

import serverRoutes from './routes';

// React and Server-Side Rendering
import routes from '../client/routes';
import configureStore from '../client/configureStore';

const app = express();

const compiler = webpack(config);

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON(object) {
      return JSON.stringify(object);
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(compression());
app.use(sass({ src: path.join(__dirname, '..', 'public'), dest: path.join(__dirname, '..', 'public') }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // for asserting and checking submission data, must be after bodyParser middleware
app.use(cookieParser());

// authentication middleware
app.use(async (req, res, next) => {
    // attach an isAuthenticated function to the req object
  req.isAuthenticated = function () {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

    // if user is authenticated, attach user account to the req object
  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated();
    const user = await new UserAccounts({ id: payload.sub }).fetch({ withRelated: 'profile' });
    req.user = user.toJSON(); // attach user object to the request
    next();
  } else {
    next();
  }
});

// Configure middleware for development environment
if (app.get('env') === 'development') {
  app.use(logger('dev')); // use the 'dev' morgan configuration for logging HTTP requests
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  remoteDev({ hostname: 'localhost', port: 8000 });
}

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', serverRoutes);

// React server rendering
app.use((req, res) => {
  const initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {},
  };

  const store = configureStore(initialState);

  match({ routes: routes(store), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>,
            );
      res.render('layouts/main', {
        html,
        initialState: store.getState(),
      });
    } else {
      res.status(404).end('Not Found.');
    }
  });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

module.exports = app;
