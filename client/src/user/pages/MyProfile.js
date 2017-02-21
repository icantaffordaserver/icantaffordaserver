/**
 * Created by alexandermann on 2017-02-18.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Divider, Button } from 'semantic-ui-react';
import Profile from '../components/Profile/ConnectionProfile';

function MyProfile() {

  return (
    <Container>
      <Segment>
        <Profile />
      </Segment>
      <Divider />
      <Button negative content="Return to Dashboard" as={Link} to="/dashboard" />
    </Container>
  );
}

export default MyProfile;