/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import platform from 'platform';
import ForgotPasswordComponent from './index';
import forgotPasswordMutation from './graphql/forgotPasswordMutation';

class ForgotPasswordContainer extends React.Component {
  static propTypes = {
    mutate: React.PropTypes.func.isRequired,
  };
  state = { loading: false, success: false, error: false, message: '' };

  handleSubmit = async email => {
    try {
      this.setState({ loading: true });
      const securityInfo = {
        // save security info to send in reset email
        browser: `${platform.name} ${platform.version}`,
        os: `${platform.os.family} ${platform.os.version}`,
      };
      await this.props.mutate({ variables: { email, securityInfo } });
      this.setState({
        loading: false,
        success: true,
        error: false,
        message: 'Check your inbox for password reset instructions.',
      });
    } catch (err) {
      this.setState({ loading: false, success: false, error: true, message: err.message });
    }
  };

  render() {
    return (
      <ForgotPasswordComponent
        loading={this.state.loading}
        success={this.state.success}
        error={this.state.error}
        message={this.state.message}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default graphql(forgotPasswordMutation)(ForgotPasswordContainer);
