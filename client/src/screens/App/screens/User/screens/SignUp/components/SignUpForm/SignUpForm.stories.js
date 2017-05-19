/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SignUpComponent from './index';

storiesOf('user.Sign Up Form', module)
  .add('Base', () => (
    <SignUpComponent onSubmit={action('onSubmit')} navigateTo={action('navigateTo')} />
  ))
  .add('Loading', () => (
    <SignUpComponent
      onSubmit={action('onSubmit')}
      navigateTo={action('navigateTo')}
      loading={true}
    />
  ))
  .add('Error', () => (
    <SignUpComponent
      onSubmit={action('onSubmit')}
      navigateTo={action('navigateTo')}
      error={'Error message here'}
    />
  ));
