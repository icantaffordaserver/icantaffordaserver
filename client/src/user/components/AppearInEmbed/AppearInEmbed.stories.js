/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import AppearInEmbed from './AppearInEmbed'

storiesOf('USER.AppearInEmbed', module)
  .add('Not active', () => (
    <AppearInEmbed src={'https://appear.in/toktumi'} timeRoomOpen={Date.now() + 10000} />
  ))
  .add('Active', () => (
    <AppearInEmbed src={'https://appear.in/toktumi'} timeRoomOpen={Date.now()} />
  ))
