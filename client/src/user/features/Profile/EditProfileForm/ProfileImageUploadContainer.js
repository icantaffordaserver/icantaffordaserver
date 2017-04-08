/**
 * Created by alexandermann on 2017-03-29.
 */
import React from 'react';
import { graphql } from 'react-apollo';

import CurrentUserQuery from '../../../../graphql/auth/currentUserQuery';
import ProfileImage from './components/ProfileImageUpload';
import { uploadProfileImg } from '../../../utils';

class ProfileImageUploadContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleUpload = async photoFile => {
    const { id, firstName, lastName } = this.props.data.viewer.user;
    try {
      this.setState({ loading: true });
      await uploadProfileImg(photoFile, id, firstName, lastName);
      this.setState({ loading: false });
      await this.props.data.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.props.data.loading) return null;

    const { loading } = this.state;
    const { profilePhoto } = this.props.data.viewer.user;
    return <ProfileImage photo={profilePhoto} loading={loading} uploadPhoto={this.handleUpload} />;
  }
}

export default graphql(CurrentUserQuery)(ProfileImageUploadContainer);
