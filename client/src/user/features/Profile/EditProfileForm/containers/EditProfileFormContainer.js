/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { compose, graphql } from 'react-apollo';

import EditProfileForm from '../components/EditProfileForm';
import currentUserQuery from '../../../../../graphql/auth/currentUserQuery';
import updateUserMutation from '../../../../../graphql/account/updateUserMutation';
import { uploadProfileImg } from '../../../../utils';

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

  handleSubmit = async ({ firstName, lastName, gender, location, bio }, droppedPhoto) => {
    try {
      const { id } = this.props.data.viewer.user;
      this.setState({ loading: true });
      if (droppedPhoto) {
        await Promise.all([
          this.props.mutate({
            variables: { input: { id, firstName, lastName, gender, location, bio } },
            refetchQueries: [{ query: currentUserQuery }],
          }),
          uploadProfileImg(droppedPhoto, id, firstName, lastName),
        ]);
      } else {
        await this.props.mutate({
          variables: { input: { id, firstName, lastName, gender, location, bio } },
          refetchQueries: [{ query: currentUserQuery }],
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
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

export default compose(graphql(currentUserQuery), graphql(updateUserMutation))(
  EditProfileFormContainer,
);
