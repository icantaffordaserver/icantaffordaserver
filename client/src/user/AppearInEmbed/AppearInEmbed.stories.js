/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import AppearInEmbed from './AppearInEmbed';

storiesOf('USER.AppearInEmbed', module)
  .add('Time in future', () => <AppearInEmbed />)
