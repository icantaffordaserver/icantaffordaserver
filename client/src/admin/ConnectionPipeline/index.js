import React from 'react';
import { connect } from 'react-redux';

import Messages from '../../shared/Messages';
import MatchedUsers from './MatchedUsers/MatchedUsers';
import CompletedConnections from './CompletedConnections/CompletedConnections';
import ConnectionPipelineModal from './ConnectionPipelineModal';
import { fetchMatchedUsers } from './actions';
import { Grid } from 'semantic-ui-react';

class ConnectionPipeline extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchMatchedUsers());
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Messages messages={this.props.messages} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <MatchedUsers matchedUsers={this.props.matchedUsers} />
          </Grid.Column>
          <Grid.Column>
            <CompletedConnections matchedUsers={this.props.matchedUsers} />
          </Grid.Column>
        </Grid.Row>
        <ConnectionPipelineModal selectedMatch={this.props.matchedUsers[this.props.selectedMatch]} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  matchedUsers: state.matchedUsers,
  selectedMatch: state.selectedMatch,
  messages: state.messages,
});

export default connect(mapStateToProps)(ConnectionPipeline);
