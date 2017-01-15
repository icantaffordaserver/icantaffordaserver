/**
 * Created by alexandermann on 2017-01-15.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import {deselectInvite, editInviteForm,} from '../../actions/invites';
import {closeModal} from '../../actions/modal';

import moment from 'moment';


class EditInviteModal extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            resend: false
        };
    }

    handleAfterModalOpened(props){
        this.setState({
            firstName: props.invite.first_name,
            lastName: props.invite.last_name,
            email: props.invite.email,
            resend: false
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleCloseEditInvite() {
        this.props.dispatch(deselectInvite());
        this.props.dispatch(closeModal());
    }

    handleEditInviteSubmit(invite) {
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

    renderEditInviteModal(props) {
        if (typeof props.invite.first_name === "undefined") { // Check selected invite is loaded
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
                    <p>{props.invite.account.profile.first_name} {props.invite.account.profile.last_name}</p>
                    <h4>On Date: </h4>
                    <p>{moment(props.invite.created_at).format('MMM Do, YYYY')}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success"
                            onClick={this.handleEditInviteSubmit.bind(this, props.invite)}>
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
        return (
            <ReactModal
                className="modal-dialog"
                style={{
                    overlay: {zIndex: 1000},
                }}
                isOpen={this.props.modal.modalProps.isOpen}
                onAfterOpen={this.handleAfterModalOpened.bind(this, this.props)}
                onRequestClose={this.handleCloseEditInvite.bind(this)}
                contentLabel="Edit Invite"
            >
                {this.renderEditInviteModal(this.props)}
            </ReactModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        modal: state.modal
    }
};

export default connect(mapStateToProps)(EditInviteModal);