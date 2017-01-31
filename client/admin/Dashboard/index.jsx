import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import InvitesSent from './InvitesSent/index';
import SendInvite from './SendInvite/index';
import InviteRequests from './InviteRequests';
import Messages from '../../shared/Messages';

function Dashboard(props) {
  return (
    <div className="container-fluid">
      <Messages messages={props.messages} />
      <Grid padded>
        <Grid.Row columns={2}>
          <Grid.Column>
            <InviteRequests />
          </Grid.Column>
          <Grid.Column>
            <SendInvite />
            <InvitesSent />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  messages: React.PropTypes.object,
};

Dashboard.defaultProps = {
  messages: {},
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(Dashboard);
