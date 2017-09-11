/**
 * Created by alexandermann on 2017-03-21.
 */
import React from 'react';
import PropTypes from 'prop-types'
import { Icon, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  max-width: 400px;
  margin: 200px auto 0 auto;
  text-align: center;
`;

const IconContainer = styled.div`
  text-align: center;
`;

class NotVerified extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  handleClick = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <MessageContainer>
        <IconContainer><Icon name="warning circle" size="massive" /></IconContainer>
        <h1>Please login then try verifying your email address.</h1>
        <Button
          primary
          icon="sign in"
          labelPosition="right"
          content="Click here to login"
          onClick={this.handleClick}
        />
      </MessageContainer>
    );
  }
}

export default NotVerified;
