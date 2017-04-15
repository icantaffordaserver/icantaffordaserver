/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react';
import { Embed, Header } from 'semantic-ui-react';
import moment from 'moment';
import TimeCountdownText from '../CountdownToConversation/TimeCountdownText';

const propTypes = {
  conversationId: React.PropTypes.string.isRequired,
  conversationTimeUTC: React.PropTypes.string.isRequired, // takes in a formatted ISO8601 string
  openXMinsBefore: React.PropTypes.number, // open the room X minutes before
};

const defaultProps = {
  openXMinsBefore: 5,
};

class VideoCallComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomOpen: false,
    };
  }

  // Initialize a timer on component load, checking every minute whether the room is open
  componentDidMount() {
    const { conversationTimeUTC, openXMinsBefore } = this.props;
    this.timerID = setInterval(
      () => this.shouldRoomOpen(conversationTimeUTC, openXMinsBefore),
      60000,
    ); // check every minute if the room should open
    this.shouldRoomOpen(conversationTimeUTC, openXMinsBefore);
  }

  // When the component dismounts clear the timer
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Check if the room should open
  shouldRoomOpen(dateStringUTC, openXMinsBefore) {
    const conversationTimeMS = moment(dateStringUTC).valueOf();
    const nowMs = moment().valueOf();
    const openXMsBefore = openXMinsBefore * 60000; // 60K ms in a sec
    if (conversationTimeMS - nowMs < openXMsBefore) {
      this.setState({
        roomOpen: true,
      });
      clearInterval(this.timerID); // remove the check when the room opens
    }
  }

  render() {
    const { conversationId, conversationTimeUTC } = this.props;
    return (
      <div>
        {this.state.roomOpen
          ? <Embed icon="right circle arrow" url={`https://appear.in/${conversationId}`} active />
          : <Header as="h1" color="teal">
              Conversation will begin in: <TimeCountdownText futureMoment={conversationTimeUTC} />
            </Header>}
      </div>
    );
  }
}

VideoCallComponent.propTypes = propTypes;
VideoCallComponent.defaultProps = defaultProps;

export default VideoCallComponent;
