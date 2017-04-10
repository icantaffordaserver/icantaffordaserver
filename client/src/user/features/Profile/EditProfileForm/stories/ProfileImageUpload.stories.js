/**
 * Created by alexandermann on 2017-04-08.
 */
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ProfileImageUpload from '../components/ProfileImageDropzone';

storiesOf('user.ProfileImageUpload', module).add('Open', () => (
  <ProfileImageDropzone uploadPhoto={action('uploadPhoto')} />
));
