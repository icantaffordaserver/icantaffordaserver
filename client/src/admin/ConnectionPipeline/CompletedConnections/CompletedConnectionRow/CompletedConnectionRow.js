/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { showModal } from '../../../../shared/Modal/actions';
import { selectMatch } from '../../actions';
import { Table, Button } from 'semantic-ui-react';

// import modal types
import { COMPLETED_CONNECTIONS_DETAILS } from '../../ConnectionPipelineModal';

class CompletedConnectionRow extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCompletedConnectionsDetails(matchIndex) {
    this.props.dispatch(selectMatch(matchIndex));
    this.props.dispatch(showModal(COMPLETED_CONNECTIONS_DETAILS));
  }

  render() {
    const { matchedBy, accounts } = this.props.data;

    return (
      <Table.Row>
        <Table.Cell>
          <div>Completed on: Insert Time here</div>
          <div>Matched by: {matchedBy.profile.first_name}</div>
        </Table.Cell>
        <Table.Cell>
          <div>
            {accounts.map(account => (
              <div key={account.id}>
                {`${account.profile.first_name} ${account.profile.last_name}`}
              </div>
            ))}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div>Reflection Complete - User 1</div>
          <div>Reflection Complete - User 2</div>
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={this.handleCompletedConnectionsDetails.bind(this, this.props.index)}
            color="blue"
            size="mini">
            Details
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect()(CompletedConnectionRow);
