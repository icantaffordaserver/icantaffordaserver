import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';
import '../semantic/dist/semantic.min.css';

const CenterStoriesWrapper = styled.div`
  margin: auto !important;
  padding: 100px;
`;

const req = require.context('../src', true, /.stories.js$/);

// build apollo provider
import makeApolloClient from '../src/utils/makeApolloClient';
import { scapholdUrl } from '../src/config';
const client = makeApolloClient(scapholdUrl);

// give stories some padding, wrap in apollo for anything that makes a request to the graphql
// server
addDecorator(story => (
  <ApolloProvider client={client}>
    <CenterStoriesWrapper>
      {story()}
    </CenterStoriesWrapper>
  </ApolloProvider>
));

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
