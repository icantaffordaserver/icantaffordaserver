/**
 * Created by alexandermann on 2017-02-15.
 */
import React from 'react';
import { Form, Segment, Image, Button, Radio } from 'semantic-ui-react';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form onSubmit={this.handleProfileUpdate}>
        <Segment clearing padded="very">
          <Image src={this.props.gravatar} size="small" shape="circular" centered />
          <Form.Field>
            <Form.Input
              label="Email"
              type="email"
              name="email"
              value={this.props.email}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="First Name"
              name="firstName"
              value={this.props.firstName}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label="Last Name"
              name="lastName"
              value={this.props.lastName}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Form.Group inline>
            <label>Gender</label>
            <Form.Field
              control={Radio}
              label="Male"
              value="male"
              name="gender"
              checked={this.props.gender === 'male'}
              onChange={this.props.handleChange}
            />
            <Form.Field
              control={Radio}
              label="Female"
              value="female"
              name="gender"
              checked={this.props.gender === 'female'}
              onChange={this.props.handleChange}
            />
          </Form.Group>
          <Form.Field>
            <Form.Input
              label="Location"
              name="location"
              value={this.props.location}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Button positive floated="right">Save Profile</Button>
        </Segment>
      </Form>
    );
  }
}

export default ProfileComponent;
