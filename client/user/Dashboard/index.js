/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Message } from 'semantic-ui-react';
import ConnectionContext from './components/ConnectionContext/ConnectionContext';
import UpcomingConnectionsTable from './components/UpcomingConnectionsTable';
import ConnectionProfile from './MatchingProfile/ConnectionProfile';
import { resendVerificationEmail, getMyConnections } from './actions';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getMyConnections());
  }

  handleOnClick() {
    this.props.dispatch(resendVerificationEmail());
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
            <ConnectionContext
              myConnections={this.props.myConnections}
            />
            <UpcomingConnectionsTable
              upcomingConnections={this.props.myConnections.allConnections}
              currentUserId={this.props.auth.user.id}
            />
          </Grid.Column>
          <Grid.Column width={8} stretched={true}>
            <Segment>
              <ConnectionProfile />
            </Segment>
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
