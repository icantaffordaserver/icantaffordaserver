import React from 'react';
import { connect } from 'react-redux';
import { fetchInvites, cancelInvite, submitInviteForm } from '../../actions/invites';
import moment from 'moment';

class InvitesSent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchInvites());
  }

  handleCancelInvite(inviteId) {
    this.props.dispatch(cancelInvite(inviteId));
  }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOpenEditInvite(inviteIndex) {
        this.props.dispatch(selectInvite(inviteIndex));
        this.props.dispatch(showModal());

    }

    handleCloseEditInvite() {
        this.props.dispatch(deselectInvite());
        this.props.dispatch(closeModal());
    }

    handleSubmit(invite, event) {
        event.preventDefault();
        this.props.dispatch(submitInviteForm(
            {
                firstName: invite.first_name,
                lastName: invite.last_name,
                email: invite.email
            },
            this.props.auth.user.id,
            {
                resend: true,
                inviteId: invite.id
            }
        ));
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
                    <form onSubmit={}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" className="form-control"
                                   value={props.invites.selected.first_name} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" className="form-control"
                                   value={props.invites.selected.last_name} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" className="form-control"
                                   value={props.invites.selected.email} onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className="btn btn-default">Send</button>
                    </form>
                    <h4>To: </h4>
                    <p>{props.invites.selected.first_name} {props.invites.selected.last_name}</p>
                    <h4>Email: </h4>
                    <p>{props.invites.selected.email}</p>
                    <h4>Sent By: </h4>
                    <p>{props.invites.selected.account.profile.first_name} {props.invites.selected.account.profile.last_name}</p>
                    <h4>On Date: </h4>
                    <p>{moment(props.invites.selected.created_at).format('MMM Do, YYYY')}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default" onClick={this.handleCloseEditInvite.bind(this)}>Close me
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
                                            onClick={this.handleCancelInvite.bind(this, invite.id)}>Cancel
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-default" onClick={this.handleSubmit.bind(this, invite)}>
                                        Send
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-default"
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
