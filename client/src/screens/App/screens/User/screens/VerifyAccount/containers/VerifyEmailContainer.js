/**
 * Created by alexandermann on 2017-03-27.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import VerifyEmailComponent from './VerifyEmail';
import verifyEmailMutation from './graphql/verifyEmailMutation';
import CurrentUserQuery from '../../../graphql/user/currentUserQuery';

class VerifyEmailContainer extends React.Component {
  state = {
    loading: true,
    success: false,
    error: false,
    alreadyVerified: false,
  };

  async componentWillReceiveProps(nextProps) {
    // perform request on page load, viewer data will first not exist and then exist, so check
    // for that condition
    console.log(nextProps.data.viewer);

    if (
      !this.props.data.viewer && nextProps.data.viewer && nextProps.data.viewer.user.verifyEmail
    ) {
      try {
        await this.props.mutate({
          variables: {
            id: nextProps.data.viewer.user.id,
            requestVars: {
              checkToken: this.props.match.params.token,
            },
          },
          refetchQueries: [{ query: CurrentUserQuery }],
        });
        this.setState({ success: true });
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      }
    } else {
      this.setState({ alreadyVerified: true });
    }
  }

  render() {
    const { loading, success, error, alreadyVerified } = this.state;
    return (
      <VerifyEmailComponent
        loading={loading}
        success={success}
        error={error}
        alreadyVerified={alreadyVerified}
      />
    );
  }
}

export default compose(graphql(verifyEmailMutation), graphql(CurrentUserQuery))(
  VerifyEmailContainer,
);
