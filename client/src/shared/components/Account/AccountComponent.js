/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

class AccountComponent extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.handleProfileUpdate}>
        <Segment clearing padded="very">
          <Form.Field>
            <Form.Input
              label="Email"
              type="email"
              name="email"
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Button type="submit" positive floated="right">Update Account</Button>
        </Segment>
      </Form>
    );
  }
}

export default AccountComponent;
