/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Message } from 'semantic-ui-react';
import RequestConnection from './components/RequestConnection';
import SetTimePreferences from './components/DateTimePreference/SetTimePreferences';
import UpcomingConnectionsTable from './components/UpcomingConnectionsTable';
import ConnectionProfile from './ConnectionProfile';
import { resendVerificationEmail, getMyConnections, requestConnection } from './actions';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRequestConnection = this.handleRequestConnection.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getMyConnections());
  }

  handleOnClick() {
    this.props.dispatch(resendVerificationEmail());
  }

  handleRequestConnection(comment) {
    this.props.dispatch(requestConnection(comment));
  }

  render() {
    return (
      <div>
        <Grid padded stretched>
          {!this.props.auth.user.email_verified && (
            <Grid.Column width={16}>
              <Message warning>
                <Message.Header>
                  You must verify your account before you can request a match.
                </Message.Header>
                <p>Didn't get the email? Click <a href="#" onClick={this.handleOnClick}>here </a>
                  to resend.
                </p>
              </Message>
            </Grid.Column>
          )}
          <Grid.Column width={8}>
            <RequestConnection
              requestConnection={this.handleRequestConnection}
              isAllowed={!this.props.myConnections.isQueued && this.props.auth.user.email_verified}
              connectionStatus={'allowed'}
            />
            <SetTimePreferences />
            <UpcomingConnectionsTable
              upcomingConnections={this.props.myConnections.allConnections}
              currentUserId={this.props.auth.user.id}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment><ConnectionProfile /></Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  myConnections: state.myConnections,
});

export default connect(mapStateToProps)(UserDashboard);
