import React from 'react';
import { connect } from 'react-redux';
import InvitesSent from './InvitesSent/index';
import SendInvite from './SendInvite/index';
import Messages from '../../Messages';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="col-sm-6">
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

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps)(Dashboard);
