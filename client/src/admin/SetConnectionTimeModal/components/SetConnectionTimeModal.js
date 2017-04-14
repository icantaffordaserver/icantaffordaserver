/**
 * Created by alexandermann on 2017-03-10.
 */
import React from 'react';
import { Header, Modal, Grid, ModalActions, Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker } from 'antd';
import isURL from 'validator/lib/isURL';

import 'antd/lib/date-picker/style/css';

import UserAvailabilityListContainer from '../containers/UserAvailabilityListContainer';

const ModalActionsStyled = styled(ModalActions)`
  display: flex;
`;

const InputFloatedLeft = styled(Input)`
  flex-grow: 1;
  float: left;
`;

class SetConnectionTimeModal extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func,
    user1: React.PropTypes.string,
    user2: React.PropTypes.string,
  };
  static defaultProps = {
    onClose: null,
    user1: null,
    user2: null,
  };
  state = {
    time: '',
    suggestion: '',
    savedSuggestion: '',
    error: false,
    submitted: false,
  };

  handleSuggestionChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSaveSuggestion = () => {
    if (!isURL(this.state.suggestion)) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false, savedSuggestion: this.state.suggestion });
    }
  };

  handleDateTimeChange = (value, dateString) => {
    this.setState({ time: value.toISOString() });
  };

  handleSave = () => {
    const { time, savedSuggestion } = this.state;
    this.props.onSave(time, savedSuggestion);
  };

  isSaveable = () => {
    const { time, savedSuggestion } = this.state;
    return (time === '' || savedSuggestion === '');
  };

  render() {
    const { open, onClose, user1, user2, loading } = this.props;
    const { error, submitted, suggestion } = this.state;

    return (
      <Modal open={open} onClose={onClose}>
        <Header icon="time" content="Set Connection Time" />
        <Modal.Content>
          <Grid textAlign="center">
            <Grid.Row>
              <Header>
                User 1 and User 2, set time for
                {' '}
                {this.state.time ? moment(this.state.time).format('dddd, MMMM Do @ h:mm a') : null}
              </Header>
            </Grid.Row>
            <Grid.Row>
              <Header>
                FireStarter set to: {this.state.savedSuggestion}
              </Header>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header content="Availability" />
                {(!user1 || !user2) &&
                  'Somehow you managed to select no users... this is a bug add a conditional below to display something to say that "you need to select some users before you can match them"'}
                {(user1 || user2) && <UserAvailabilityListContainer id1={user1} id2={user2} />}
              </Grid.Column>
              <Grid.Column>
                <Header content="Set Connection Time" />
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select Time"
                  onChange={this.handleDateTimeChange}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <ModalActionsStyled>
          <InputFloatedLeft
            action={{
              color: 'green',
              labelPosition: 'right',
              icon: submitted ? 'checkmark' : 'record',
              content: submitted ? 'Saved!' : 'Set FireStarter Video',
              onClick: this.handleSaveSuggestion,
            }}
            error={error}
            placeholder="Youtube link to FireStarter"
            name="suggestion"
            onChange={this.handleSuggestionChange}
            value={suggestion}
          />
          <Button
            loading={loading}
            disabled={this.isSaveable()}
            color="blue"
            icon="save"
            labelPosition="right"
            content="Save"
            onClick={this.handleSave}
          />
        </ModalActionsStyled>
      </Modal>
    );
  }
}

export default SetConnectionTimeModal;
