import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import App from './App';
import '../semantic/dist/semantic.min.css';

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cizpv0k3u6kcq0127mxlb8urr' });
networkInterface.use([{
  applyMiddleware(req, next){
    if (!req.options.headers) {
      req.options.headers = {};
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`;
    }
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
