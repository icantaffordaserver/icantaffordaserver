/**
 * Created by alexandermann on 2017-04-07.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import EditProfileForm from '../components/EditProfileForm';

const mockUser = {
  firstName: 'Alex',
  lastName: 'Mann',
  gender: 'male',
  location: null,
  bio: null,
};

storiesOf('user.EditProfileForm', module).add('Open', () => (
  <EditProfileForm user={mockUser} onSubmit={action('onSubmit')} />
));
