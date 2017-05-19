/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ReflectionModal from './components/ReflectionModal';

storiesOf('user.Reflection Modal', module).add('Open', () => <ReflectionModal modalOpen />);
