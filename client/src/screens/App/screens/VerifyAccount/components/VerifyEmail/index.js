/**
 * Created by alexandermann on 2017-03-27.
 */
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Loader, Dimmer, Icon, Button } from "semantic-ui-react";
import styled from "styled-components";

const LoadingSegment = styled(Segment)`
  height: 300px;
  width: 250px;
  margin: auto !important;
`;
const MessageContainer = styled.div`
  max-width: 400px;
  margin: 200px auto 0 auto;
  text-align: center;
`;

const Message = styled.h1`text-align: center;`;

const IconContainer = styled.div`text-align: center;`;
const propTypes = {};

const defaultProps = {};

class VerifyEmailComponent extends React.Component {
  renderLoading() {
    return (
      <LoadingSegment>
        <Dimmer active inverted>
          <h1>Verifying your email address.</h1>
          <Loader size="large" />
        </Dimmer>
      </LoadingSegment>
    );
  }

  renderVerified() {
    return (
      <MessageContainer>
        <IconContainer>
          <Icon name="mail outline" size="massive" />
        </IconContainer>
        <Message>Your email address is verified.</Message>
        <Link to="/dashboard">
          <Button positive content="Take me to my dashboard" />
        </Link>
      </MessageContainer>
    );
  }

  renderError() {
    return (
      <MessageContainer>
        <IconContainer>
          <Icon name="warning sign" size="massive" />
        </IconContainer>
        <Message>
          An error occurred while trying to validate your email address, please
          try again.
        </Message>
      </MessageContainer>
    );
  }

  render() {
    const { success, error, alreadyVerified } = this.props;
    if (success || alreadyVerified) return this.renderVerified();
    if (error) return this.renderError();
    return this.renderLoading();
  }
}

VerifyEmailComponent.propTypes = propTypes;
VerifyEmailComponent.defaultProps = defaultProps;

export default VerifyEmailComponent;
