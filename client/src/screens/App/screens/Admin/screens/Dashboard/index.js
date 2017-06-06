import React from 'react';
import { Grid } from 'semantic-ui-react';

import InvitesSentContainer from './InvitesSent/InvitesSentContainer';
import SendInviteContainer from './SendInvite/SendInviteContainer';
import InviteRequestsContainer from '../InviteRequests/InviteRequestsContainer';

const propTypes = {};
const defaultProps = {};

function Dashboard(props) {
  return (
    <div className="container-fluid">
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column>
            <InviteRequestsContainer />
          </Grid.Column>
          <Grid.Column>
            <SendInviteContainer />
            <InvitesSentContainer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default Dashboard;
