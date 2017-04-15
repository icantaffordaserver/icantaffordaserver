/**
 * Created by alexandermann on 2017-03-21.
 */
import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import ResendVerificationEmailButtonContainer
  from '../components/ResendVerificationEmail/ResendVerificationEmailButtonContainer';
import currentUserQuery from '../../graphql/user/currentUserQuery';

const MessageContainer = styled.div`
  max-width: 400px;
  margin: 200px auto 0 auto;
  text-align: center;
`;

const IconContainer = styled.div`
  text-align: center;
`;

class NotVerified extends React.Component {
  render() {
    if (this.props.data.loading) return null;

    // TODO: move to HOC for isLoggedIn
    if (!this.props.data.viewer.user) return <Redirect to="/login" />;

    return (
      <MessageContainer>
        <IconContainer><Icon name="mail outline" size="massive" /></IconContainer>
        <h1>You must verify your email address before you can begin using Shift</h1>
        <ResendVerificationEmailButtonContainer />
      </MessageContainer>
    );
  }
}

export default graphql(currentUserQuery)(NotVerified);
