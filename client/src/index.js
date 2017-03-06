import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './utils/makeApolloClient';
import App from './App';
import '../semantic/dist/semantic.min.css';

// Graph.cool api: https://api.graph.cool/simple/v1/cizpv0k3u6kcq0127mxlb8urr
// Scaphold.io api: https://us-west-2.api.scaphold.io/graphql/shift-beta

const scapholdUrl = 'us-west-2.api.scaphold.io/graphql/shift-beta';
const client = makeApolloClient(scapholdUrl);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
