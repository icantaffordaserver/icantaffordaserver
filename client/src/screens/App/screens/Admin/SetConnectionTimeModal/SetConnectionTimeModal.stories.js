/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import SetConnectionTimeModal from './components/SetConnectionTimeModal';

storiesOf('ADMIN.Set Connection Time', module).add('Open', () => (
  <SetConnectionTimeModal open onSave={action('onSave')} />
));
