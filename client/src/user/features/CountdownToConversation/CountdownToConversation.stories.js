/**
 * Created by alexandermann on 2017-04-14.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CountdownToConversation from './CountdownToConversation';

storiesOf('USER.CountdownToConversation', module)
  .add('Time to countdown in past', () => (
    <CountdownToConversation timeToCountdownTo={new Date()}>
      Hello World
    </CountdownToConversation>
  ))
  .add('Will render child components in 10s', () => (
    <CountdownToConversation timeToCountdownTo={new Date(Date.now() + 10000).toISOString()}>
      <div>Hello World</div>
    </CountdownToConversation>
  ))
  .add('Time to countdown in future', () => (
    <CountdownToConversation timeToCountdownTo={new Date(Date.now() + 10000000).toISOString()}>
      <div>Hello World</div>
    </CountdownToConversation>
  ));
