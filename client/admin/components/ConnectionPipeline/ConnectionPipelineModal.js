/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import {closeModal} from '../../actions/modal';
import {setConnectionTime} from '../../actions/connections';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

export const SET_CONNECTION_TIME           = 'SET_CONNECTION_TIME';
export const MATCHED_USERS_DETAILS         = 'MATCHED_USERS_DETAILS';
export const COMPLETED_CONNECTIONS_DETAILS = 'COMPLETED_CONNECTIONS_DETAILS';

class ConnectionPipelineModal extends React.Component {
    constructor(props) {
        super(props);
        momentLocalizer(moment);
        this.state = {
            dateTime: null
        }
    }

    handleAfterModalOpened(props) {
        console.log(props.selectedMatch.connection_time);
        this.setState({
            dateTime: props.selectedMatch.connection_time ? new Date(props.selectedMatch.connection_time) : null
        });
    }

    handleCloseConnectionPipelineModal() {
        this.props.dispatch(closeModal());
    }

    handleSetConnectionTime() {
        let connectionTime = moment(this.state.dateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
        let connectionId   = this.props.selectedMatch.id;
        this.props.dispatch(setConnectionTime(connectionId, connectionTime));
        this.props.dispatch(closeModal());
    }

    renderSetDateTimePicker(props) {
        let onChange = (dateTime, dateTimeStr) => {
            console.log('dateTime: ', dateTime);
            this.setState({
                dateTime: dateTime
            });
        };
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Set Date and Time</h3>
                </div>
                <div className="modal-body">
                    <div>
                        <DateTimePicker min={new Date()}
                                        value={this.state.dateTime}
                                        onChange={onChange.bind(this)}
                        />

                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={this.handleSetConnectionTime.bind(this)}
                            className="btn btn-success">Save
                    </button>
                    <button onClick={this.handleCloseConnectionPipelineModal.bind(this)}
                            className="btn btn-danger">Cancel
                    </button>
                </div>
            </div>
        );
    }

    renderMatchedUsersDetails() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>[User 1] and [User 2] Matched Connection Details</h3>
                </div>
                <div className="modal-body">
                    <div>
                        <h4>hellloooooo houston!</h4>

                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success">Save</button>
                    <button onClick={this.handleCloseConnectionPipelineModal.bind(this)}
                            className="btn btn-danger">Cancel
                    </button>
                </div>
            </div>
        );
    }

    renderCompletedConnectionsDetails() {
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <h3>[User 1] and [User 2] Completed Connection Details</h3>
                </div>
                <div className="modal-body">
                    <div>
                        <h4>hellloooooo DALLLLLLASSSS!</h4>

                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success">Save</button>
                    <button onClick={this.handleCloseConnectionPipelineModal.bind(this)}
                            className="btn btn-danger">Cancel
                    </button>
                </div>
            </div>
        );
    }

    renderModal(modalType) {
        switch (modalType) {
            case SET_CONNECTION_TIME:
                return this.renderSetDateTimePicker();
            case MATCHED_USERS_DETAILS:
                return this.renderMatchedUsersDetails();
            case COMPLETED_CONNECTIONS_DETAILS:
                return this.renderCompletedConnectionsDetails();
            default:
                return null;
        }
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
                onRequestClose={this.handleCloseConnectionPipelineModal.bind(this)}
                contentLabel="Connection Pipeline Modal"
            >
                {this.renderModal(this.props.modal.modalType)}
            </ReactModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    }
};

export default connect(mapStateToProps)(ConnectionPipelineModal);