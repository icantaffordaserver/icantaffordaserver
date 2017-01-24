import React from 'react';
import moment from 'moment';
import {showModal} from '../../../../shared/Modal/actions';
import {selectMatch, deleteConnection} from '../../actions';
import {connect} from 'react-redux';

// import modal types
import {MATCHED_USERS_DETAILS, SET_CONNECTION_TIME} from '../../ConnectionPipelineModal';

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
        this.props.dispatch(showModal(MATCHED_USERS_DETAILS))
    }

    handleDeleteConnection(connectionId){
        this.props.dispatch(deleteConnection(connectionId));
    }

    render() {
        return (
            <tr>
                <td>
                    <div>Matched on: {moment(this.props.data.created_at).format('MMM Do, YYYY')}</div>
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
                    <button className="btn btn-default" style={{whiteSpace: 'normal', width: '100px'}}
                            onClick={this.handleSetConnectionTime.bind(this, this.props.index)}>
                        {this.props.data.connection_time ? 'Edit' : 'Set'} Connection Time
                    </button>
                </td>
                <td>
                    <button onClick={this.handleMatchedUsersDetails.bind(this, this.props.index)} className="btn btn-default">Details
                    </button>
                </td>
                <td>
                    <button onClick={this.handleDeleteConnection.bind(this, this.props.data.id)} className="btn btn-danger">Cancel</button>
                </td>
            </tr>
        );
    }
}

export default connect()(MatchedUsersRow);
