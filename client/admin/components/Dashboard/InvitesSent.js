import React from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal'
import {fetchInvites, cancelInvite, selectInvite, deselectInvite, submitInviteForm, editInviteForm, resendInvite} from '../../actions/invites';
import {closeModal, showModal} from '../../actions/modal';
import moment from 'moment';

class InvitesSent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '', email: '', resend: false};

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.props.dispatch(fetchInvites());
    }

    handleCancelInvite(inviteId) {
        this.props.dispatch(cancelInvite(inviteId));
    }

    handleOpenEditInvite(inviteIndex) {
        this.props.dispatch(selectInvite(inviteIndex));
        this.props.dispatch(showModal());
        this.setState({
            firstName: this.props.invites.all[inviteIndex].first_name,
            lastName: this.props.invites.all[inviteIndex].last_name,
            email: this.props.invites.all[inviteIndex].email
        });

    }

    handleCloseEditInvite() {
        this.props.dispatch(deselectInvite());
        this.props.dispatch(closeModal());
    }

    handleEditInviteSubmit(invite){
        event.preventDefault();
        this.props.dispatch(editInviteForm(
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            },
            this.props.auth.user.id,
            {
                resend: this.state.resend,
                inviteId: invite.id
            }
        ));
        this.props.dispatch(deselectInvite());
        this.props.dispatch(closeModal());
    }

    handleResendInvite(invite, event) {
        event.preventDefault();
        this.props.dispatch(resendInvite(invite.id));
    }

    renderEditInviteModal(props) {
        if (typeof props.invites.selected.first_name === "undefined") { // Check selected invite is loaded
            return (
                <div className="modal-content">
                </div>
            );
        }
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Edit Invite</h3>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" className="form-control"
                                   value={this.state.firstName} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" className="form-control"
                                   value={this.state.lastName} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control"
                                   value={this.state.email} onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label className="form-check-label">
                                Check to resend
                            </label>
                            <input type="checkbox" name="resend" className="form-check-input"
                                   value={this.state.resend} onChange={this.handleChange.bind(this)}/>
                        </div>
                    </form>
                    <h4>Sent By: </h4>
                    <p>{props.invites.selected.account.profile.first_name} {props.invites.selected.account.profile.last_name}</p>
                    <h4>On Date: </h4>
                    <p>{moment(props.invites.selected.created_at).format('MMM Do, YYYY')}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={this.handleEditInviteSubmit.bind(this, props.invites.selected)}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={this.handleCloseEditInvite.bind(this)}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    render() {
        // console.log(this.props);
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
                                    <button className="btn btn-primary" onClick={this.handleResendInvite.bind(this, invite)}>
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
                <ReactModal
                    className="modal-dialog"
                    style={{
                        overlay: {zIndex: 1000},
                    }}
                    isOpen={this.props.modal.modalProps.isOpen}
                    onRequestClose={this.handleCloseEditInvite.bind(this)}
                    contentLabel="Edit Invite"
                >
                    {this.renderEditInviteModal(this.props)}
                </ReactModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        invites: state.invites,
        modal: state.modal
    };
};

export default connect(mapStateToProps)(InvitesSent);
