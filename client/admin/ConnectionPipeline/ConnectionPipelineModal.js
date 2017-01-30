/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { closeModal } from '../../shared/Modal/actions';
import { setConnectionTime } from './actions';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import ConnectionDetails from './ConnectionDetails';

export const SET_CONNECTION_TIME = 'SET_CONNECTION_TIME';
export const MATCHED_USERS_DETAILS = 'MATCHED_USERS_DETAILS';
export const COMPLETED_CONNECTIONS_DETAILS = 'COMPLETED_CONNECTIONS_DETAILS';

class ConnectionPipelineModal extends React.Component {
  constructor(props) {
    super(props);
    momentLocalizer(moment);
    this.state = {
      dateTime: null,
    };
  }

  handleAfterModalOpened(props) {
    this.setState({
      dateTime: props.selectedMatch.connection_time ? new Date(props.selectedMatch.connection_time) : null,
    });
  }

  handleCloseConnectionPipelineModal() {
    this.props.dispatch(closeModal());
  }

  handleSetConnectionTime() {
    const connectionTime = moment(this.state.dateTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS');
    const connectionId = this.props.selectedMatch.id;
    this.props.dispatch(setConnectionTime(connectionId, connectionTime));
    this.props.dispatch(closeModal());
  }

  renderSetDateTimePicker(props) {
    const onChange = (dateTime, dateTimeStr) => {
      this.setState({
        dateTime,
      });
    };
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h3>Set Date and Time</h3>
        </div>
        <div className="modal-body">
          <div>
            <DateTimePicker
              min={new Date()}
              value={this.state.dateTime}
              onChange={onChange.bind(this)}
            />

          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={this.handleSetConnectionTime.bind(this)}
            className="btn btn-success"
          >Save
                    </button>
          <button
            onClick={this.handleCloseConnectionPipelineModal.bind(this)}
            className="btn btn-danger"
          >Cancel
                    </button>
        </div>
      </div>
    );
  }

  renderMatchedUsersDetails() {
    return (
      <ConnectionDetails
        {...this.props}
        handleCloseModal={this.handleCloseConnectionPipelineModal.bind(this)}
        titleEnding={'Matched Connection Details'}
      />
    );
  }

  renderCompletedConnectionsDetails() {
    return (
      <ConnectionDetails
        {...this.props}
        handleCloseModal={this.handleCloseConnectionPipelineModal.bind(this)}
        titleEnding={'Completed Connection Details'}
      />
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
          overlay: { zIndex: 1000 },
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

const mapStateToProps = state => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ConnectionPipelineModal);
