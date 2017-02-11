import React from 'react';
import moment from 'moment';
import { showModal } from '../../../../shared/Modal/actions';
import { selectMatch, deleteConnection } from '../../actions';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';

// import modal types
import { MATCHED_USERS_DETAILS, SET_CONNECTION_TIME } from '../../ConnectionPipelineModal';

class MatchedUsersRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSetConnectionTime(matchIndex) {
    this.props.dispatch(selectMatch(matchIndex));
    this.props.dispatch(showModal(SET_CONNECTION_TIME));
  }

  handleMatchedUsersDetails(matchIndex) {
    this.props.dispatch(selectMatch(matchIndex));
    this.props.dispatch(showModal(MATCHED_USERS_DETAILS));
  }

  handleDeleteConnection(connectionId) {
    this.props.dispatch(deleteConnection(connectionId));
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <div>Matched on: {moment(this.props.data.created_at).format('MMM Do, YYYY')}</div>
          <div>Matched by: {this.props.data.matchedBy.profile.first_name}</div>
        </Table.Cell>
        <Table.Cell>
          <div>
            {this.props.data.accounts.map(account => (
              <div key={account.id}>
                {`${account.profile.first_name} ${account.profile.last_name}`}
              </div>
            ))}
          </div>
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={this.handleSetConnectionTime.bind(this, this.props.index)}
            color="green"
            size="mini">
            {this.props.data.connection_time ? 'Edit' : 'Set'} Connection Time
          </Button>
          <Button
            onClick={this.handleMatchedUsersDetails.bind(this, this.props.index)}
            color="blue"
            size="mini">
            Details
          </Button>
          <Button
            onClick={this.handleDeleteConnection.bind(this, this.props.data.id)}
            color="red"
            size="mini">
          Cancel
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect()(MatchedUsersRow);
