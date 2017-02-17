/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { Grid, Segment, Button, Embed } from 'semantic-ui-react';


function ConnectionPanel(props) {
  return (
    <Grid padded columns={2} stretched>
      <Grid.Column width={10}>
        <Segment>
          <Embed icon="right circle arrow" url="https://appear.in/timeforashift1" active />
        </Segment>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment>Connection Guide goes here!</Segment>
      </Grid.Column>
    </Grid>
  );
}

export default ConnectionPanel;
