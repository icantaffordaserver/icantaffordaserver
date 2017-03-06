import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Header, Segment, Grid, Button, Divider, Container } from 'semantic-ui-react';

const propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
};

function Signup(props) {
  return (
    <Grid centered verticalAlign="middle">
      <Grid.Column width={6} textAlign="left">
        <Form onSubmit={props.handleSubmit} size="large">
          <Header textAlign="center" as="h2" color="teal">Create an account</Header>
          <Segment padded>
            <Form.Field>
              <Form.Input
                label="First Name"
                name="firstName"
                icon="quote left"
                iconPosition="left"
                placeholder="First Name"
                onChange={props.handleChange}
                value={props.firstName}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Last Name"
                name="lastName"
                icon="quote left"
                iconPosition="left"
                placeholder="Last Name"
                onChange={props.handleChange}
                value={props.lastName}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Email"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={props.handleChange}
                value={props.email}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={props.handleChange}
                value={props.password}
              />
            </Form.Field>
            <Button fluid color="teal" size="large">Create Account</Button>
            <Divider horizontal>Or</Divider>
            <Button fluid color="blue" size="large">Create Account with Facebook</Button>
          </Segment>
        </Form>
        <Header textAlign="center" size="tiny">
          By signing up, you agree to the <Link to="/">Terms of Service</Link>.
        </Header>
        <Container textAlign="center">
          Already have an account? <Link to="/login">Log in</Link>.
        </Container>
      </Grid.Column>
    </Grid>
  );
}

Signup.propTypes = propTypes;

export default Signup;
