import React from 'react';
import InvitesSent from './InvitesSent';
import SendInvite from './SendInvite';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
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

export default Dashboard;
