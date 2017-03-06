import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import remoteDev from 'remotedev-server';
import dotenv from 'dotenv';
import createPasswordReset from './microservices/createPasswordReset';
import updatePasswordReset from './microservices/updatePasswordReset';
import deletePasswordReset from './microservices/deletePasswordReset';

// Load environment variables from .env file
dotenv.config({ path: process.env.PWD + '/.env' });

const app = express();

app.set('port', process.env.PORT || 3001);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // for asserting and checking submission data, must be after bodyParser middleware
app.use(cookieParser());

// Configure middleware for development environment
if (app.get('env') === 'development') {
  app.use(logger('dev')); // use the 'dev' morgan configuration for logging HTTP requests
  remoteDev({ hostname: 'localhost', port: 8000 });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/microservices/createPasswordReset', createPasswordReset);
app.post('/microservices/updatePasswordReset', updatePasswordReset);
app.post('/microservices/deletePasswordReset', deletePasswordReset);

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
