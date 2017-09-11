/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react'
import { graphql } from 'react-apollo'
import { Grid } from 'semantic-ui-react'

import AppearInEmbedContainer from './containers/AppearInEmbedContainer'
import AllSurveyCardsContainer from './containers/AllSurveyCardsContainer'
import InspoCardHeaderContainer from './containers/InspoCardHeaderContainer'
import ConnectionMatchProfileContainer from './containers/MatchProfileContainer'

import currentUserQuery from '../../shared/graphql/queries/currentUserQuery'

// TODO: need to devise a better way to fetch the current connection data without repeatably passing in the current user Id
function ConnectionPanel(props) {
  if (props.data.loading) return null

  return (
    <Grid padded columns={2} stretched>
      <Grid.Row>
        <Grid.Column width={10}>
          <AppearInEmbedContainer />
        </Grid.Column>
        <Grid.Column width={6}>
          <ConnectionMatchProfileContainer currentUserId={props.data.viewer.user.id} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign="center">
        <InspoCardHeaderContainer currentUserId={props.data.viewer.user.id} />
        <AllSurveyCardsContainer currentUserId={props.data.viewer.user.id} />
      </Grid.Row>
    </Grid>
  )
}

// pass keydown events on this screen, //TODO consider moving to app level?
export default graphql(currentUserQuery)(ConnectionPanel)
