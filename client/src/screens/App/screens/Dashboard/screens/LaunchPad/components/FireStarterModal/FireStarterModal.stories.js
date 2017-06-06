/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import FireStarterModal from './index';

storiesOf('user.FireStarter Modal', module)
  .add('Open, no src', () => <FireStarterModal modalOpen />)
  .add('Open, with src', () => (
    <FireStarterModal modalOpen fireStarterSrc="https://www.youtube.com/embed/qu4U7lwZTRI" />
  ));
