/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import moment from 'moment';
import {showModal} from '../../../../Modal/actions';
import {selectMatch} from '../../actions';
import {connect} from 'react-redux';

// import modal types
import {COMPLETED_CONNECTIONS_DETAILS} from '../../ConnectionPipelineModal';


class CompletedConnectionRow extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCompletedConnectionsDetails(matchIndex) {
        this.props.dispatch(selectMatch(matchIndex));
        this.props.dispatch(showModal(COMPLETED_CONNECTIONS_DETAILS))
    }

    render() {
        return (
            <tr>
                <td>
                    <div>Connection Completed on: Insert Time here</div>
                    <div>Matched by: {this.props.data.matchedBy.profile.first_name}</div>
                </td>
                <td>
                    <div>
                        {this.props.data.accounts.map((account) => {
                            return (
                                <div key={account.id}>
                                    {account.profile.first_name + ' ' + account.profile.last_name}
                                </div>
                            );
                        })}
                    </div>
                </td>
                <td>
                    <div>Reflection Complete - User 1</div>
                    <div>Reflection Complete - User 2</div>
                </td>
                <td>
                    <button onClick={this.handleCompletedConnectionsDetails.bind(this, this.props.index)} className="btn btn-default">Details</button>
                </td>
            </tr>
        );
    }
}

export default connect()(CompletedConnectionRow);
