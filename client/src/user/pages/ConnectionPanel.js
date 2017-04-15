/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import keydown from 'react-keydown';
import { Grid, Segment } from 'semantic-ui-react';
import AppearInEmbedContainer from '../containers/AppearInEmbedContainer';

function ConnectionPanel(props) {
  return (
    <Grid padded columns={2} stretched>
      <Grid.Column width={10}>
        <AppearInEmbedContainer />
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment>
          Profile here
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

// pass keydown events on this screen, //TODO consider moving to app level?
export default keydown('left', 'right')(ConnectionPanel);
