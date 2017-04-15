/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TimeCountdownText from './TimeCountdownText'

storiesOf('USER.TimeCountdownText', module)
  .add('Time in future', () => <TimeCountdownText timeToCountdownTo={Date.now() + 1000000} />)
  .add('Time in past', () => <TimeCountdownText timeToCountdownTo={Date.now()} />)
