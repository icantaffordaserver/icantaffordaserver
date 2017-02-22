import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import configureStore from './configureStore';
import '../semantic/dist/semantic.min.css';

const store = configureStore();
const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://us-west-2.api.scaphold.io/graphql/deep-statement' }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
