/**
 * Created by alexandermann on 2017-04-23.
 */
// Vanilla Lambda function.
import app from './app';
const awsServerlessExpress = require('aws-serverless-express')

const server = awsServerlessExpress.createServer(app)

export default (event, context) => awsServerlessExpress.proxy(server, event, context)
