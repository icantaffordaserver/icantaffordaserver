/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';

class SocialComponent extends React.Component {

  render() {
    return (
      <Form onSubmit={this.handleProfileUpdate}>
        <Segment clearing padded="very">
          // TODO
          Put some facebook stuff here
          <Button positive floated="right">Update Social</Button>
        </Segment>
      </Form>
    );
  }
}

export default SocialComponent;
