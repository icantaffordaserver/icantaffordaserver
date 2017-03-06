/**
 * Created by alexandermann on 2017-03-05.
 */
import React from 'react';
import MyAccountComponent from '../components/MyAccountComponent';

const propTypes = {};

const defaultProps = {};

class AccountContainer extends React.Component {

  render() {
    return (
      <MyAccountComponent {...this.props} />
    );
  }

}

AccountContainer.propTypes = propTypes;
AccountContainer.defaultProps = defaultProps;

export default AccountContainer;
