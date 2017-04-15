/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import LaunchPadItem from '../LaunchPadItem';
import notes from './045_Notes.png';
import CurrentUserQuery from '../../../../graphql/user/currentUserQuery';

const propTypes = {
  data: React.PropTypes.object.isRequired,
  history: React.PropTypes.object.isRequired,
};

class MyProfileLaunchButtonContainer extends React.Component {
  handleClick = () => {
    this.props.history.push('/dashboard/profile');
  };

  renderMyProfileLabel = () => {
    if (this.props.data.loading) return null;
    if (!this.props.data.viewer.user.typeformProfileComplete) {
      return 'Click to get started';
    }
    if (this.props.data.viewer.user.typeformProfileComplete) {
      return 'Click to edit';
    }
    return null;
  };

  render() {
    if (this.props.data.loading) return null;

    return (
      <LaunchPadItem
        imgSrc={notes}
        header="My Profile"
        labelMessage={this.renderMyProfileLabel()}
        labelPosition="top right"
        labelColor="green"
        onClick={this.handleClick}
      />
    );
  }
}

MyProfileLaunchButtonContainer.propTypes = propTypes;

export default compose(
  withRouter,
  graphql(CurrentUserQuery),
)(MyProfileLaunchButtonContainer);
