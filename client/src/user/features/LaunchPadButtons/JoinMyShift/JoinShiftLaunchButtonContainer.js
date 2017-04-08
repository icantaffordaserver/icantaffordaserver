/**
 * Created by alexandermann on 2017-03-12.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import LaunchPadItem from '../LaunchPadItem';
import computer from './105_Reading.png';
import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';

class JoinShiftLaunchButtonContainer extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
  };

  renderLabelMessage = () => {
    if (this.props.data.viewer.user.connections.edges.length === 0) return null;
    const latestConnection = this.props.data.viewer.user.connections.edges[0].node;
    if (latestConnection.connectionStatus === 'matched') return 'You have been matched!';
    if (latestConnection.connectionStatus === 'scheduled') {
      return `Your Shift is scheduled for ${moment(latestConnection.connectionTime).format('MMM DD h:mm A')}`;
    }
    return null;
  };

  handleClick = () => {
    if (this.isDisabled()) return;
    this.props.history.push('/chat');
  };

  isDisabled = () => {
    return true;
  };

  render() {
    if (this.props.data.loading) return null;

    return (
      <LaunchPadItem
        imgSrc={computer}
        header="Join my Shift"
        labelMessage={this.renderLabelMessage()}
        labelPosition="top left"
        labelColor="blue"
        onClick={this.handleClick}
        disabled={this.isDisabled()}
      />
    );
  }
}

export default compose(
  withRouter,
  graphql(CurrentUserQuery)
)(JoinShiftLaunchButtonContainer);
