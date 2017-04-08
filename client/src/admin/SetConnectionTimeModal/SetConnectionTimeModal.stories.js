/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { ApolloProvider } from 'react-apollo';
import SetConnectionTimeModal from './components/SetConnectionTimeModal';

// TODO: refactor this out for use in stories and for index
import makeApolloClient from '../../utils/makeApolloClient';
import { scapholdUrl } from '../../config';
const client = makeApolloClient(scapholdUrl);

storiesOf('admin.Set Connection Time', module)
  .addDecorator(story => (
    <ApolloProvider client={client}>
      {story()}
    </ApolloProvider>
  ))
  .add('Open', () => <SetConnectionTimeModal open onSave={action('onSave')} />);
