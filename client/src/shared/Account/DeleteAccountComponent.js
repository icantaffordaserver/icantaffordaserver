/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Form, Segment, Button, Header, Divider } from 'semantic-ui-react';

class DeleteAccountComponent extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.handleDeleteAccount}>
        <Segment clearing padded="very">
          <Header as="h2">
            You can delete your account, but keep in mind this action is irreversible.
          </Header>
          <Divider />
          <Button negative fluid>Delete Account</Button>
        </Segment>
      </Form >
    );
  }
}

export default DeleteAccountComponent;
