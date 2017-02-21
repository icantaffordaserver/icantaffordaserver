/**
 * Created by alexandermann on 2017-02-06.
 */
import React from 'react';
import { connect } from 'react-redux';
import crypto from 'crypto';
import GettingStarted from './GettingStarted';
import CurrentProfile from './CurrentProfile';
import ProfileBuilder from './ProfileBuilder';

function generateToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

class ConnectionProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUrl: null,
      isBuildingProfile: false,
    };
    this.buildProfile = this.buildProfile.bind(this);
    this.cancelBuildProfile = this.cancelBuildProfile.bind(this);
    this.finishBuildProfile = this.finishBuildProfile.bind(this);
  }

  buildProfile() {
    const { id: userId } = this.props.auth.user;
    const { first_name: firstName } = this.props.auth.user.profile;
    generateToken().then((token) => {
      this.setState({
        isBuildingProfile: true,
        profileUrl: `https://shiftwithus.typeform.com/to/aHq8UA?first_name=${firstName}&user_id=${userId}&response_id=${token}`,
      });
    });
  }

  cancelBuildProfile() {
    this.setState({
      isBuildingProfile: false,
    });
  }

  finishBuildProfile() {
    this.setState({
      isBuildingProfile: false,
    });
  }

  render() {
    if (this.state.isBuildingProfile) {
      return (<ProfileBuilder
        typeformUrl={this.state.profileUrl}
        handleDone={this.finishBuildProfile}
        handleCancel={this.cancelBuildProfile}
      />);
    }
    return this.props.auth.user.profile.typeform_profile_complete ?
      (<CurrentProfile
        profile={this.props.auth.user.profile}
        handleUpdateProfile={this.buildProfile}
      />)
      :
      (<GettingStarted
        profile={this.props.auth.user.profile}
        handleGetStarted={this.buildProfile}
      />);
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ConnectionProfile);
