import React from 'react';

class UserProfile extends React.Component {
  formatLocation(profile) {
    return `${profile.city}, ${profile.state_province} (${profile.country})`;
  }

  render() {
    const user = this.props.user;
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="media row">
            <div className="media-left">
              <img src={user.gravatar} width="65px" />
            </div>
            <div className="media-body">
              <h3>{`${user.profile.first_name} ${user.profile.last_name}`}</h3>
              <div style={{ textTransform: 'capitalize' }}>{user.profile.gender}</div>
              <div>Location: {this.formatLocation(user.profile)}</div>
              <div>Phone Number: {user.phone_number}</div>
              <div>Email: {user.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
