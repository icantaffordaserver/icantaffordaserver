/**
 * Created by alexandermann on 2017-04-15.
 */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import ConnectionMatchProfile from './ConnectionMatchProfile';

storiesOf('USER.ConnectionMatchProfile', module)
  .add('Base', () => (
    <ConnectionMatchProfile
      name="Alex"
      firstConversationDate={'2017-04-29T21:33:38.000Z'}
      mostRecentConversationDate={'2017-04-30T21:33:38.000Z'}
      profileImg={undefined}
      location={'Toronto'}
      bio={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean metus diam, molestie ac iaculis sed, condimentum rutrum enim. Integer dapibus arcu eu erat dictum lobortis. Donec at congue felis, sed vestibulum dolor. Phasellus laoreet sollicitudin tempus. Integer finibus, metus non laoreet ultricies, lorem eros iaculis nulla, sit amet commodo lacus ex ut velit. Sed pharetra a ante in ornare. Vestibulum dapibus rutrum quam.'}
    />
  ))
