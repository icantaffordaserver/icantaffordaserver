/**
 * Created by alexandermann on 2017-03-02.
 */
import React from 'react';


const propTypes = {
  user: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class AdminMenu extends React.Component {

  render() {
    const { user } = this.props;
    if (user.admin) { // TODO case where user is an admin
      return <AdminSubMenu />;
    } else if (user) {
      return <UserSubMenu />;
    }
    return null;
  }

}

AdminMenu.propTypes = propTypes;
AdminMenu.defaultProps = defaultProps;

export default AdminMenu;
