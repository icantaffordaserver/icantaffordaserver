import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';
import InvitesSent from './InvitesSent/index';
import SendInvite from './SendInvite/index';
import Messages from '../../shared/Messages';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="col-sm-6">
          <Container text>
            <Header as="h2">Requests</Header>
            <p>Here is some example text inside of this container</p>
          </Container>
        </div>
        <div className="col-sm-6">
          <div>
            <SendInvite />
          </div>
          <div>
            <InvitesSent />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Dashboard);
