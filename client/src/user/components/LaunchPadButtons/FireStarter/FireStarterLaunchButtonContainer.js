/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../../../../graphql/user/currentUserQuery';
import LaunchPadItem from '../LaunchPadItem';
import diamond from './049_Diamond.png';
import FireStarterModalContainer from '../../FireStarterModal/FireStarterModalContainer';
import isConnectionSet from '../../../isConnectionSet';

class FireStarterLaunchButtonContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  state = {
    modalOpen: false,
  };

  handleClick = () => {
    if (!this.props.data.viewer.user.typeformProfileComplete) return;
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  renderLabelProps = () => {
    const { connectionTime } = this.props.data.viewer.user.connections.edges[0].node;

    if (isConnectionSet(connectionTime)) {
      return {
        labelMessage: 'FireStarter Available',
        labelColor: 'green',
        labelPosition: 'top right',
      };
    }
  };

  render() {
    if (this.props.data.loading) return null;

    const { typeformProfileComplete } = this.props.data.viewer.user;
    // TODO: similar onClick refactor for launchpad item
    return (
      <div>
        <LaunchPadItem
          {...this.renderLabelProps()}
          imgSrc={diamond}
          header="FireStarter"
          onClick={this.handleClick}
          disabled={!typeformProfileComplete}
        />
        <FireStarterModalContainer modalOpen={this.state.modalOpen} onClose={this.handleClose} />
      </div>
    );
  }
}

export default graphql(currentUserQuery)(FireStarterLaunchButtonContainer);
