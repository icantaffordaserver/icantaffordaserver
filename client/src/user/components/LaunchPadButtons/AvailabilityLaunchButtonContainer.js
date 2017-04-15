/**
 * Created by alexandermann on 2017-03-29.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import CurrentUserQuery from '../../../graphql/user/currentUserQuery';
import LaunchPadItem from './LaunchPadItem';
import selection from './057_Selection.png';

class AvailabilityLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired,
  };

  handleClick = () => {
    if (!this.props.data.viewer.user.typeformProfileComplete) return;
    const { history } = this.props;
    history.push('/dashboard/availability');
  };

  hasSetAvailability = () => {
    if (!this.props.data.viewer.user.availability) return false; // check if availability has been set
    return Object.keys(this.props.data.viewer.user.availability).length > 0; // return true if availability has 1 slot or more selected
  };

  render() {
    if (this.props.data.loading) return null;

    const { typeformProfileComplete } = this.props.data.viewer.user;
    const labelMessage = this.hasSetAvailability()
      ? 'Edit your availabilty'
      : 'You need to set your availability';

    return (
      <LaunchPadItem
        imgSrc={selection}
        header="Availability"
        labelColor={this.hasSetAvailability() ? 'green' : 'red'}
        labelMessage={labelMessage}
        labelPosition="top right"
        disabled={!typeformProfileComplete}
        onClick={this.handleClick}
      />
    );
  }
}

export default withRouter(graphql(CurrentUserQuery)(AvailabilityLaunchButtonContainer));
