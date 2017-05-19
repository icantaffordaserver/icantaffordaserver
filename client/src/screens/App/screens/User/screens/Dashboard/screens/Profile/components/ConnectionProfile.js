/**
 * Created by alexandermann on 2017-02-06.
 */
import React from 'react';
import GettingStarted from '../../../containers/GettingStartedContainer';
import CurrentProfile from './CurrentProfile';
import ProfileBuilder from './ProfileBuilder';



class ConnectionProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUrl: null,
      isBuildingProfile: false,
    };
  }

  buildProfile = async () => {
    const { id: userId, firstName } = this.props.data.viewer.user;
    const token = await generateToken();
    this.setState({
      isBuildingProfile: true,
      profileUrl: `https://shiftwithus.typeform.com/to/aHq8UA?first_name=${firstName}&user_id=${userId}&response_id=${token}`,
    });
  };

  cancelBuildProfile = () => {
    this.setState({
      isBuildingProfile: false,
    });
  };

  finishBuildProfile = () => {
    this.setState({
      isBuildingProfile: false,
    });
  };

  render() {
    if (this.props.data.loading) return null;
    if (this.state.isBuildingProfile) {
      return (<ProfileBuilder
        typeformUrl={this.state.profileUrl}
        handleDone={this.finishBuildProfile}
        handleCancel={this.cancelBuildProfile}
      />);
    }
    return this.props.data.viewer.user.typeformProfileComplete ?
      (<CurrentProfile
        profile={this.props.data.viewer.user.typeformProfile}
        handleUpdateProfile={this.buildProfile}
      />)
      :
      (<GettingStarted
        firstName={this.props.data.viewer.user.firstName}
        handleGetStarted={this.buildProfile}
      />);
  }
}

export default graphql(CurrentUserQuery)(ConnectionProfile);
