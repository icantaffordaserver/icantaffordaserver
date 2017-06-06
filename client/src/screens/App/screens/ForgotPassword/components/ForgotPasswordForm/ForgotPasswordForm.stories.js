/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ForgotPasswordComponent from './index';

storiesOf('user.Forgot Password', module)
  .add('Base', () => <ForgotPasswordComponent />);
