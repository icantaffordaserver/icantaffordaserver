/**
 * Created by alexandermann on 2017-03-16.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import CurrentProfile from '../components/CurrentProfile';
import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';

const propTypes = {};

const defaultProps = {};

class CurrentProfileContainer extends React.Component {
  render() {
    if (this.props.data.loading) return null;
    return <CurrentProfile user={this.props.data.viewer.user}/>;
  }
}

CurrentProfileContainer.propTypes = propTypes;
CurrentProfileContainer.defaultProps = defaultProps;

export default graphql(CurrentUserQuery)(CurrentProfileContainer);
