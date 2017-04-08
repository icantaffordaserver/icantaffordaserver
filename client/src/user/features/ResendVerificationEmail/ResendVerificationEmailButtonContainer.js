/**
 * Created by alexandermann on 2017-03-28.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import CurrentUserQuery from '../../../graphql/auth/currentUserQuery';
import resendVerificationEmailMutation from './graphql/resendVerificationEmailMutation';

const propTypes = {
  mutate: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class ResendVerificationEmailButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttonStatusMessage: 'Click to resend email',
      success: false,
      error: false,
    };
  }

  handleClick = async () => {
    const { id, email } = this.props.data.viewer.user;
    try {
      this.setState({ loading: true });
      await this.props.mutate({
        variables: {
          input: { userId: id, emailToVerify: email },
        },
      });
      this.setState({ loading: false, buttonStatusMessage: 'Email sent!', success: true });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, buttonStatusMessage: 'An error occurred', error: true });
    }
  };

  render() {
    const { loading, success, error, buttonStatusMessage } = this.state;
    return (
      <Button
        positive={!error}
        negative={error}
        disabled={success || error}
        onClick={this.handleClick}
        loading={loading}
      >
        {buttonStatusMessage}
      </Button>
    );
  }
}

ResendVerificationEmailButtonContainer.propTypes = propTypes;
ResendVerificationEmailButtonContainer.defaultProps = defaultProps;

export default compose(graphql(CurrentUserQuery), graphql(resendVerificationEmailMutation))(
  ResendVerificationEmailButtonContainer,
);
