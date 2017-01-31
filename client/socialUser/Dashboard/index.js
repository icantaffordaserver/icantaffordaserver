/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Message, Button } from 'semantic-ui-react';
import UpcomingConnectionsTable from './UpcomingConnectionsTable';

const spoofData = [{
  connection_date: 'Jan 30, 2018',
  connection_time: '6:30 PM EST',
  match_name: 'Blake',
  match_profile: {},
}];

function UserDashboard(props) {
  return (
    <div>
      <Grid padded stretched>
        {!props.auth.user.email_verified && (
          <Grid.Column width={16}>
            <Message warning>
              <Message.Header>
                You must verify your account before you can request a match.
              </Message.Header>
              <p>Didn't get the email? Click <a href="#">here</a> to resend.</p>
            </Message>
          </Grid.Column>
        )}
        <Grid.Column width={8}>
          <Segment>
            <Button disabled={!props.auth.user.email_verified} size="massive" positive fluid>
              Match me with someone!
            </Button>
          </Segment>
          <UpcomingConnectionsTable upcomingConnections={spoofData} />
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>My profile and interests go here!</Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserDashboard);
