/**
 * Created by alexandermann on 2017-03-13.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';
import LaunchPadItem from '../LaunchPadItem';
import diamond from './049_Diamond.png';
import FireStarterModalContainer from '../../FireStarterModal/FireStarterModalContainer';

const propTypes = {
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class FireStarterLaunchButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleClick = () => {
    if (!this.props.data.viewer.user.typeformProfileComplete) return;
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    if (this.props.data.loading) return null;

    const { typeformProfileComplete } = this.props.data.viewer.user;
    // TODO: similar onClick refactor for launchpad item
    return (
      <div>
        <LaunchPadItem
          imgSrc={diamond}
          header="Firestarter"
          onClick={this.handleClick}
          disabled={!typeformProfileComplete}
        />
        <FireStarterModalContainer modalOpen={this.state.modalOpen} onClose={this.handleClose} />
      </div>
    );
  }
}

FireStarterLaunchButtonContainer.propTypes = propTypes;
FireStarterLaunchButtonContainer.defaultProps = defaultProps;

export default graphql(CurrentUserQuery)(FireStarterLaunchButtonContainer);
