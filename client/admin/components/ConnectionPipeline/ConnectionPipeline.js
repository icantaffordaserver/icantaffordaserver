import React from 'react';
import Messages from '../Messages';
import MatchedUsers from './MatchedUsers';
import CompletedConnections from './CompletedConnections';
import ConnectionPipelineModal from './ConnectionPipelineModal';
import {fetchMatchedUsers} from '../../actions/connections';
import {connect} from 'react-redux';


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
