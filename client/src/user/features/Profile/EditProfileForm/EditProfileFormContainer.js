/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';

import EditProfileForm from './components/EditProfileForm';
import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';
import updateUserMutation from '../../../../graphql/account/updateUserMutation';

const propTypes = {
  mutate: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

class EditProfileFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = async ({ firstName, lastName, gender, location, bio }) => {
    try {
      const { id } = this.props.data.viewer.user;
      this.setState({ loading: true });
      await this.props.mutate({
        variables: { id, firstName, lastName, gender, location, bio },
        refetchQueries: [{ query: CurrentUserQuery }],
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.props.data.loading) return null;
    const { loading } = this.state;
    return (
      <EditProfileForm
        user={this.props.data.viewer.user}
        loading={loading}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

EditProfileFormContainer.propTypes = propTypes;

export default compose(graphql(CurrentUserQuery), graphql(updateUserMutation))(
  EditProfileFormContainer,
);
