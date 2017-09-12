import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Form,
  Header,
  Segment,
  Grid,
  Button,
  Container,
  Checkbox,
  Message
} from "semantic-ui-react";

import { validateSignUp } from "./helpers";

class SignUp1 extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
  };
  static defaultProps = {
    error: ""
  };

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    error: "",
    showPassword: false,

    userData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthday: "",
      bio: "",
      location: {}
    }
  };

  onSubmit = (event, data) => {
    event.preventDefault(); // prevent page reload
    this.setState({ error: "" }); // clear any old errors
    const { firstName, lastName, email, password, birthday } = data.formData;
    const signUpErrors = validateSignUp(
      firstName,
      lastName,
      email,
      password,
      birthday
    );
    if (typeof signUpErrors === "string") {
      // if validate sign up returns string we have an error
      this.setState({ error: signUpErrors, 
        userData: {firstName, lastName, email, password, birthday: birthday} });
      return;
    }
    this.props.onSubmit(this.state.userData);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderErrors = () => {
    if (this.state.error !== "")
      return <Message error header={this.state.error} />;
    if (this.props.error !== "")
      return <Message error header={this.props.error} />;
    return null;
  };

  showHidePass = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const error = this.state.error !== "" || this.props.error !== "";
    return (
      <div className="columns">
        <div className="column is-half">Image will go here</div>
        <div className="column is-half">
          <Grid centered verticalAlign="middle">
            <Grid.Column width={6} textAlign="left">
              <Form onSubmit={this.onSubmit} size="large" error={error}>
                <Segment padded>
                  <Header textAlign="center" as="h1" color="teal">
                    Sign Up
                  </Header>
                  {this.renderErrors()}
                  <div className="columns">
                    <div className="column is-half">
                    <Form.Field>
                      <label className="label">First Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                        />
                      </div>
                    </Form.Field>
                    </div>
                    <div className="column is-half">
                      <Form.Field>
                        <label className="label">Last Name</label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                          />
                        </div>
                      </Form.Field>
                    </div>
                  </div>
                  <Form.Field>
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                    </div>
                  </Form.Field>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-right">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        type={this.state.showPassword ? "text" : "password"}
                        onChange={this.handleChange}
                        value={this.state.password}
                      />

                      <span className="icon is-small is-right">
                        <i className="fa fa-eye" />
                      </span>
                    </div>
                    <Checkbox
                      onClick={this.showHidePass}
                      label="Show password"
                    />
                  </div>
                  <Form.Field>
                    <label className="label">Date Of Birth</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="birthday"
                        placeholder="DD/MM/YYYY"
                        onChange={this.handleChange}
                        value={this.state.birthday}
                      />
                    </div>
                  </Form.Field>
                  <Button
                    fluid
                    color="teal"
                    size="large"
                    loading={this.props.loading}
                  >
                    Create Account
                  </Button>
                  {/* TODO: facebook auth */}
                  {/*<Divider horizontal>Or</Divider>*/}
                  {/*<Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
                  <Header textAlign="center" size="tiny">
                    By signing up, you agree to the{" "}
                    <Link to="/termsofservice">Terms of Service</Link>.
                  </Header>
                  <p style={{ textAlign: "center" }}>
                    Already have an account? <Link to="/login">Log in</Link>.
                  </p>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default SignUp1;
