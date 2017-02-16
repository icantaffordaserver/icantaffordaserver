/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

class ChangePasswordComponent extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.handleChangePassword}>
        <Segment clearing padded="very">
          <Form.Input
            label="Password"
            type="password"
            name="password"
            value={this.props.password}
            onChange={this.props.handleChange}
          />
          <Form.Input
            label="Confirm Password"
            type="password"
            name="confirm"
            value={this.props.confirm}
            onChange={this.props.handleChange}
          />
          <Button positive floated="right">Update Password</Button>
        </Segment>
      </Form>
    );
  }
}

export default ChangePasswordComponent;
