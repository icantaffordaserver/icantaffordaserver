/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { closeModal } from '../../shared/components/Modal/actions';
import { setConnectionTime } from './actions';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { Modal, Header, Input, Button, Icon } from 'semantic-ui-react';
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

  formatTitle(accounts, ending) {
    return `${accounts[0].profile.first_name} ${accounts[0].profile.last_name}
                     and ${accounts[1].profile.first_name} ${accounts[1].profile.last_name} ${ending}`;
  }

  renderSetDateTimePicker(props) {
    const onChange = (dateTime, dateTimeStr) => {
      this.setState({
        dateTime,
      });
    };
    return (
      <Modal.Content>
        <DateTimePicker
          min={new Date()}
          value={this.state.dateTime}
          onChange={onChange.bind(this)}
        />
      </Modal.Content>
    );
  }

  renderSetDateTimeBtns() {
    return (
      <Modal.Actions>
        <Button
          onClick={this.handleSetConnectionTime.bind(this)}
          positive>
          Save
        </Button>
        <Button
          onClick={this.handleCloseConnectionPipelineModal.bind(this)}
          negative>
          Cancel
        </Button>
      </Modal.Actions>
    );
  }

  renderActionBtns() {
    return (
      <Modal.Actions>
        <Button
          positive>
          <Icon name="checkmark"></Icon>Save
        </Button>
        <Button
          onClick={this.handleCloseConnectionPipelineModal.bind(this)}
          negative>
          <Icon name="remove"></Icon>Cancel
        </Button>
      </Modal.Actions>
    )
  }

  getModalElements() {
    const { selectedMatch } = this.props;

    return {
      SET_CONNECTION_TIME: {
        header: (
          <Header as="h3">
            <Icon name="add to calendar"></Icon>
            <Header.Content>Set Date and Time</Header.Content>
          </Header>
        ),
        content: this.renderSetDateTimePicker.bind(this),
        action: this.renderSetDateTimeBtns.bind(this)
      },
      MATCHED_USERS_DETAILS: {
        header: (
          <Header as="h3">
            {this.formatTitle(selectedMatch.accounts, 'Matched Connection Details')}
          </Header>
        ),
        content: () => (<ConnectionDetails {...this.props} />),
        action: this.renderActionBtns.bind(this)
      },
      COMPLETED_CONNECTIONS_DETAILS: {
        header: (
          <Header as="h3">
            {this.formatTitle(selectedMatch.accounts, 'Completed Connection Details')}
          </Header>
        ),
        content: () => (<ConnectionDetails {...this.props} />),
        action: this.renderActionBtns.bind(this)
      }
    }
  }

  render() {
    const { modalType, modalProps } = this.props.modal;
    if (!modalType) return null;
    const modalElement = this.getModalElements.bind(this)()[modalType];

    return (
      <Modal size="small"
        className="modal-dialog"
        closeIcon="close"
        open={modalProps.isOpen}
        onOpen={this.handleAfterModalOpened.bind(this, this.props)}
        onClose={this.handleCloseConnectionPipelineModal.bind(this)}
      >
        {modalElement.header}
        {modalElement.content()}
        {modalElement.action && modalElement.action()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(ConnectionPipelineModal);
