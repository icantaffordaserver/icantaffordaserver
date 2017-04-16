/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react'
import keydown from 'react-keydown'
import { Grid } from 'semantic-ui-react'
import AppearInEmbedContainer from '../containers/AppearInEmbedContainer'
import ConnectionMatchProfile from '../components/ConnectionPanelMatchProfile'
import AllSurveyCardsContainer from '../containers/AllSurveyCardsContainer';

function ConnectionPanel(props) {
  return (
    <Grid padded columns={2} stretched>
      <Grid.Row>
        <Grid.Column width={10}>
          <AppearInEmbedContainer />
        </Grid.Column>
        <Grid.Column width={6}>
          <ConnectionMatchProfile name="Alex" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign="center">
        <h1>[Match Name] Inspo Cards</h1>
        <AllSurveyCardsContainer />
      </Grid.Row>
    </Grid>
  )
}

// pass keydown events on this screen, //TODO consider moving to app level?
export default keydown('left', 'right')(ConnectionPanel)
