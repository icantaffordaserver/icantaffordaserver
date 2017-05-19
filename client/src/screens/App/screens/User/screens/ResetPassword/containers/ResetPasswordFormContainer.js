/**
 * Created by alexandermann on 2017-03-05.
 */
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ResetPasswordComponent from './ResetPasswordForm';

const propTypes = {
  mutate: React.PropTypes.func.isRequired,
  match: React.PropTypes.object.isRequired,
};

const defaultProps = {};

const mutation = gql`
  mutation resetPassword($id: ID!, $token: String!, $password: String!) {
    updatePasswordReset(input: {id: $id, resetToken: $token, newPassword: $password,}) {
      clientMutationId
    }
  }
`;

class ResetPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loading: false, success: false, error: false };
  }

  async handleSubmit(password) {
    const { id, token } = this.props.match.params;
    try {
      this.setState({ loading: true });
      await this.props.mutate({ variables: { id, token, password } });
      this.setState({ loading: false, success: true, error: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, success: false, error: true });
    }
  }

  render() {
    return (
      <ResetPasswordComponent
        loading={this.state.loading}
        success={this.state.success}
        error={this.state.error}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

ResetPasswordContainer.propTypes = propTypes;
ResetPasswordContainer.defaultProps = defaultProps;

export default graphql(mutation)(ResetPasswordContainer);
