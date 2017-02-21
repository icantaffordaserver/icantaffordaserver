/**
 * Created by alexandermann on 2017-02-19.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Divider, Button } from 'semantic-ui-react';
import RequestConversationComponent from '../components/RequestConversationComponent';

function RequestConversation() {
  return (
    <Container>
      <Header as="h1" textAlign="center">Request Conversation State</Header>
      <RequestConversationComponent />
      <Divider />
      <Button negative as={Link} to="/dashboard" content="Return to Dashboard" />
    </Container>
  );
}

export default RequestConversation;
