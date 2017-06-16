/**
 * Created by alexandermann on 2017-02-17.
 */
import React from 'react'
import { Grid } from 'semantic-ui-react'

import JoinConversationLaunchButtonContainer from './containers/JoinConversationLaunchButtonContainer'
import FireStarterLaunchButtonContainer from './containers/FireStarterLaunchButtonContainer'
import AvailabilityLaunchButtonContainer from './containers/AvailabilityLaunchButtonContainer'
import RequestConnectionLaunchButtonContainer from './containers/RequestConnectionLaunchButtonContainer'
import ReflectionLaunchButtonContainer from './containers/ReflectionLaunchButtonContainer'
import MyProfileLaunchButtonContainer from './containers/MyProfileLaunchButtonContainer'
import ContextView from '../../../../shared/components/ContextView'

const LaunchPad = () =>
  <ContextView title="🚀 My Launchpad">
    <Grid container verticalAlign="middle" columns={3}>
      <Grid.Row>
        <Grid.Column>
          <JoinConversationLaunchButtonContainer />
        </Grid.Column>
        <Grid.Column>
          <FireStarterLaunchButtonContainer />
        </Grid.Column>
        <Grid.Column>
          <AvailabilityLaunchButtonContainer />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <RequestConnectionLaunchButtonContainer />
        </Grid.Column>
        <Grid.Column>
          <ReflectionLaunchButtonContainer />
        </Grid.Column>
        <Grid.Column>
          <MyProfileLaunchButtonContainer />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </ContextView>

export default LaunchPad
