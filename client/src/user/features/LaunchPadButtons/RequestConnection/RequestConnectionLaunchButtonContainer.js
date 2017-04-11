/**
 * Created by alexandermann on 2017-03-07.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import currentUserQuery from '../../../../graphql/user/currentUserQuery';
import LaunchPadItem from '../LaunchPadItem';
import tap from './129_Tap.png';
import RequestConnectionModalContainer from '../../RequestConnectionModal/RequestConnectionModalContainer';

const propTypes = {
  data: React.PropTypes.object.isRequired,
};

class RequestConnectionLaunchButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modalOpen: false,
    };
  }

  openModal = () => {
    if (this.isDisabled()) return; // if a request is pending, cannot request another
    this.setState({
      modalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
    });
  };

  hasRequestPending = () => {
    if (this.props.data.viewer.user.connectionQueue !== null) {
      return true;
    }
    return false;
  };

  hasSetAvailability = () => {
    return Object.keys(this.props.data.viewer.user.availability).length > 0; // return true if availability has 1 slot or more selected
  };

  isDisabled = () => {
    const { typeformProfile, availability } = this.props.data.viewer.user;
    return this.hasRequestPending() || !typeformProfile || !this.hasSetAvailability();
  };

  render() {
    if (this.props.data.loading) return null;

    return (
      <div>
        <LaunchPadItem
          imgSrc={tap}
          header="Request a Shift"
          labelMessage={this.hasRequestPending() ? 'Connection Requested' : null}
          labelPosition="top left"
          loading={this.state.loading}
          disabled={this.isDisabled()}
          onClick={this.openModal}
        />
        <RequestConnectionModalContainer isOpen={this.state.modalOpen} onClose={this.closeModal} />
      </div>
    );
  }
}

RequestConnectionLaunchButtonContainer.propTypes = propTypes;

export default compose(graphql(currentUserQuery))(RequestConnectionLaunchButtonContainer);
