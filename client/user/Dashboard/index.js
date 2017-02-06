/**
 * Created by alexandermann on 2017-01-31.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Message, Button, Form, TextArea, Divider } from 'semantic-ui-react';
import UpcomingConnectionsTable from './components/UpcomingConnectionsTable';
import { resendVerificationEmail, getMyConnections, requestConnection } from './actions';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRequestConnection = this.handleRequestConnection.bind(this);
    this.handleOnCommentChange = this.handleOnCommentChange.bind(this);
    this.state = {
      requestConnectionComment: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getMyConnections());
  }

  handleOnClick() {
    this.props.dispatch(resendVerificationEmail());
  }

  handleRequestConnection() {
    this.props.dispatch(requestConnection(this.state.requestConnectionComment));
  }

  handleOnCommentChange(e) {
    this.setState({
      requestConnectionComment: e.target.value,
    });
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
            <Segment>
              <Header as="h1" textAlign="center">Request Connection</Header>
              <Form>
                <TextArea
                  placeholder="Give our matching experts more info on who you want to talk with or about"
                  onChange={this.handleOnCommentChange}
                />
              </Form>
              <Divider />
              <Button
                disabled={!this.props.auth.user.email_verified}
                onClick={this.handleRequestConnection}
                size="massive"
                positive
                fluid
              >
                Match me with someone!
              </Button>
            </Segment>
            <UpcomingConnectionsTable
              upcomingConnections={this.props.myConnections}
              currentUserId={this.props.auth.user.id}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>My profile and interests go here!</Segment>
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
