import React from 'react';
import {connect} from 'react-redux';
import {
    fetchInvites,
    cancelInvite,
    selectInvite,
    deselectInvite,
    resendInvite
} from '../../actions/invites';
import {closeModal, showModal} from '../../actions/modal';
import moment from 'moment';
import EditInviteModal from './EditInviteModal';

const POLL_INTERVAL = 500;

class InvitesSent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchInvites());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.invites.all != nextProps.invites.all) {
            clearTimeout(this.timeout);
            if (!nextProps.invites.isPolling) this.startPoll();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        this.timeout = setTimeout(() => this.props.dispatch(fetchInvites()), POLL_INTERVAL);
    }

    handleCancelInvite(inviteId, event) {
        event.preventDefault();
        this.props.dispatch(cancelInvite(inviteId));
    }

    handleOpenEditInvite(inviteIndex) {
        this.props.dispatch(selectInvite(inviteIndex));
        this.props.dispatch(showModal());
    }

    handleCloseEditInvite() {
        this.props.dispatch(deselectInvite());
        this.props.dispatch(closeModal());
    }

    handleResendInvite(invite, event) {
        event.preventDefault();
        this.props.dispatch(resendInvite(invite.id));
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h3>Invites Sent</h3></div>
                <table className="table table-condensed">
                    <tbody>
                    <tr>
                        <th>Date Sent</th>
                        <th>Sent By</th>
                        <th>To</th>
                        <th>Accepted?</th>
                        <th>Cancel</th>
                        <th>Resend</th>
                        <th>Edit</th>
                    </tr>
                    {this.props.invites.all.map((invite, inviteIndex) => {
                        return (
                            <tr key={invite.id}>
                                <td>{moment(invite.created_at).format('MMM Do, YYYY')}</td>
                                <td>{invite.account.profile.first_name}</td>
                                <td>{invite.email}</td>
                                <td>{invite.accepted ?
                                    <i className="material-icons brand-success valign">done</i> :
                                    <i className="material-icons brand-danger valign">clear</i>}
                                </td>
                                <td>
                                    <button disabled={invite.accepted} className="btn btn-danger"
                                            onClick={this.handleCancelInvite.bind(this, invite.id)}>
                                        Cancel
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary"
                                            onClick={this.handleResendInvite.bind(this, invite)}>
                                        Send
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-warning"
                                            onClick={this.handleOpenEditInvite.bind(this, inviteIndex)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <EditInviteModal invite={this.props.invites.selected}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invites: state.invites
    };
};

export default connect(mapStateToProps)(InvitesSent);
