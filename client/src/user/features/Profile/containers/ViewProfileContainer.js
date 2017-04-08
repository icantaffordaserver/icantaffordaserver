/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { Header } from 'semantic-ui-react';

import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';
import ProfileHeader from '../components/ProfileHeader';
import AllCards from '../components/AllCards';

const propTypes = {};

const defaultProps = {};

class ViewProfileContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null;

    const {
      profilePhoto,
      typeformProfile: { profileResponses, dateSubmit },
    } = this.props.data.viewer.user;
    return (
      <div>
        <ProfileHeader user={this.props.data.viewer.user} />
        <Header as="h2" content="My Cards" textAlign="center" />
        <AllCards profileResponses={profileResponses} />
      </div>
    );
  }
}

ViewProfileContainer.propTypes = propTypes;
ViewProfileContainer.defaultProps = defaultProps;

export default graphql(CurrentUserQuery)(ViewProfileContainer);
