import React from 'react';
import {connect} from 'react-redux';

import Messages from '../../shared/Messages';
import MatchedUsers from './MatchedUsers/MatchedUsers';
import CompletedConnections from './CompletedConnections/CompletedConnections';
import ConnectionPipelineModal from './ConnectionPipelineModal';
import {fetchMatchedUsers} from './actions';



class ConnectionPipeline extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMatchedUsers());
    }

    render() {
        return (
            <div className="connection-pipeline container-fluid">
                <Messages messages={this.props.messages}/>
                <div className="row">
                    <div className="col-md-6">
                        <MatchedUsers matchedUsers={this.props.matchedUsers}/>
                    </div>
                    <div className="col-md-6">
                        <CompletedConnections matchedUsers={this.props.matchedUsers}/>
                    </div>
                </div>
                <ConnectionPipelineModal selectedMatch={this.props.matchedUsers[this.props.selectedMatch]}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        matchedUsers: state.matchedUsers,
        selectedMatch: state.selectedMatch,
        messages: state.messages
    };
};

export default connect(mapStateToProps)(ConnectionPipeline);
