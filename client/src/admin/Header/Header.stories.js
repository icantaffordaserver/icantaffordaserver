/**
 * Created by alexandermann on 2017-04-12.
 */
import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Header from './Header';

storiesOf('ADMIN.Header', module)
  .add('Not Logged In', () => (
    <Header
      isAdmin={false}
      email={null}
      profileImgSrc={null}
      adminUrl={'/admin/dashboard'}
      dashboardUrl={'/dashboard'}
      homeUrl={'/'}
      loginUrl={'/login'}
      accountUrl={'/account'}
      logout={action('logout')}
      navigateTo={action('navigateTo')}
    />
  ))
  .add('Regular User', () => (
    <Header
      isAdmin={false}
      email={'alexander.mann@me.com'}
      profileImgSrc={'https://gravatar.com/avatar/f5f5fd869e834dd4628291a70ec22a4c?s=200&d=retro'}
      adminUrl={'/admin/dashboard'}
      dashboardUrl={'/dashboard'}
      homeUrl={'/'}
      loginUrl={'/login'}
      accountUrl={'/account'}
      logout={action('logout')}
      navigateTo={action('navigateTo')}
    />
  ))
  .add('Admin User', () => (
    <Header
      isAdmin={true}
      email={'alexander.mann@me.com'}
      profileImgSrc={'https://gravatar.com/avatar/f5f5fd869e834dd4628291a70ec22a4c?s=200&d=retro'}
      adminUrl={'/admin/dashboard'}
      dashboardUrl={'/dashboard'}
      homeUrl={'/'}
      loginUrl={'/login'}
      accountUrl={'/account'}
      logout={action('logout')}
      navigateTo={action('navigateTo')}
    />
  ));
