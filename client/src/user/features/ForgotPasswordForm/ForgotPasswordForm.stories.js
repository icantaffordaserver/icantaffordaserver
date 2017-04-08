/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ForgotPasswordComponent from './ForgotPasswordForm';

storiesOf('user.Forgot Password', module)
  .add('Open, no src', () => <ForgotPasswordComponent />)
  .add('Open, with src', () => (
    <FireStarterModal modalOpen fireStarterSrc="https://www.youtube.com/embed/qu4U7lwZTRI" />
  ));
