/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import LoginComponent from './index';

storiesOf('user.Login Form', module)
  .add('Base', () => (
    <LoginComponent onSubmit={action('onSubmit')} navigateTo={action('navigateTo')} />
  ))
  .add('Loading', () => (
    <LoginComponent
      onSubmit={action('onSubmit')}
      navigateTo={action('navigateTo')}
      loading={true}
    />
  ))
  .add('Error', () => (
    <LoginComponent
      onSubmit={action('onSubmit')}
      navigateTo={action('navigateTo')}
      error={'Error message here'}
    />
  ));
