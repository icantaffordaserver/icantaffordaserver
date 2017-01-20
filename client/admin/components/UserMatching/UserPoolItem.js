import React from 'react';

const listItemStyle = {
  display: 'inline-block',
  width: '100%'
};

class UserPoolItem extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <li className="list-group-item clearfix" style={listItemStyle}>
        <div className="row">
          <div className="media col-sm-12">
            <div className="media-left">
              <img src={user.gravatar} width="50px" />
            </div>
            <div className="media-body">
              <div>{user.profile.first_name + ' ' + user.profile.last_name}</div>
              <span>{user.profile.city + ', ' + user.profile.state_province}</span>
            </div>
            <div className="media-right">
              <button className="btn btn-success"
                style={{whiteSpace: 'normal'}}
                onClick={this.props.setSelectedUser.bind(null, user)}
                disabled={this.props.selectedUsers.filter((o) => user.id === o.id).length !== 0}>
                Select User
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default UserPoolItem;
