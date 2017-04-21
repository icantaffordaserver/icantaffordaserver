/**
 * Created by alexandermann on 2017-04-02.
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import 'isomorphic-fetch';

const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJraW5kIjoic2NhcGhvbGQuc3VwZXJ1c2VyIiwiZXhwIjo4NjQwMDAwMDAwMDAwMDAwLCJpYXQiOjE0ODg1NzgzNDYsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaXNzIjoiaHR0cHM6Ly9zY2FwaG9sZC5hdXRoMC5jb20vIiwic3ViIjoiMjdlZmU5MDAtMzNkOS00ZjQ3LThlMmQtZGJlZGY4NTA0ZjZmIn0.Rt8sUyF4vF8_Ya21fbzDC22RU8NJ5cLrWjI6KAtaPbg';
const SCAPHOLD_URL = 'us-west-2.api.scaphold.io/graphql/shift-beta';

// Note that scapholdUrl expects the url without the http:// or wss://
function makeApolloClient(scapholdUrl) {
  const graphqlUrl = `https://${scapholdUrl}`;
  const networkInterface = createNetworkInterface({ uri: graphqlUrl });
  networkInterface.use([
    {
      applyMiddleware(req, next) {
        // Easy way to add authorization headers for every request
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // make sure every request has admin rights
        req.options.headers.Authorization = `Bearer ${ADMIN_TOKEN}`;
        next();
      },
    },
  ]);

  return new ApolloClient({ networkInterface });
}

export default makeApolloClient(SCAPHOLD_URL);
