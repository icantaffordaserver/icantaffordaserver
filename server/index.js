import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import remoteDev from 'remotedev-server';
import dotenv from 'dotenv';
import serverRoutes from './routes';

// Load environment variables from .env file
dotenv.config({ path: process.env.PWD + '/.env' });

// Models
const UserAccounts = require('./models/UserAccounts').UserAccounts;

const app = express();

app.set('port', process.env.PORT || 3001);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // for asserting and checking submission data, must be after bodyParser middleware
app.use(cookieParser());

// authentication middleware
app.use(async(req, res, next) => {
  // attach an isAuthenticated function to the req object
  req.isAuthenticated = () => {
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
  remoteDev({ hostname: 'localhost', port: 8000 });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/', serverRoutes);

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}


app.listen(app.get('port'), (err) => {
  if (err) throw err;
  console.log(`Current Environment: ${app.get('env')}\nExpress server listening on port ${app.get('port')}\n`); // eslint-disable-line no-console
});