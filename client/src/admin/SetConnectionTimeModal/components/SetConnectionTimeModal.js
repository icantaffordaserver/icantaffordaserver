/**
 * Created by alexandermann on 2017-03-10.
 */
import React from 'react';
import { Header, Modal, Grid } from 'semantic-ui-react';
import moment from 'moment';
import InputMoment from 'input-moment';
import 'input-moment/dist/input-moment.css';
import UserAvailabilityListContainer from '../containers/UserAvailabilityListContainer';

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
    m: moment(),
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    this.props.onSave(this.state.m.toISOString());
  };

  render() {
    const { open, onClose, user1, user2 } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <Header icon="time" content="Set Connection Time" />
        <Modal.Content>
          <Grid textAlign="center">
            <Grid.Row>
              <Header>
                User 1 and User 2, set time for
                {' '}
                {this.state.m ? moment(this.state.m).format('dddd, MMMM Do @ h:mm a') : null}
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
                <InputMoment
                  moment={this.state.m}
                  onChange={this.handleChange}
                  onSave={this.handleSave}
                  prevMonthIcon="caret left icon"
                  nextMonthIcon="caret right icon"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SetConnectionTimeModal;
