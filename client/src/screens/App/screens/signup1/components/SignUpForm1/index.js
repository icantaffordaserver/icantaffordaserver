import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FormH1,
  SignUpImg,
  Div,
  OverLay,
  FormDiv,
  ImageDiv,
  FormSegment
} from "./styles";

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

import productShot from "../../assets/images/signup-shot1.jpg";

import { validateSignUp } from "./helpers";
import { SignUpStepTwo } from "./signUpStepTwo";

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
    error: "",
    showPassword: false,
    nextStep: 0
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
      this.setState({
        error: signUpErrors
      });
      return;
    }
    this.props.onSubmit({ firstName, lastName, email, password, birthday });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderErrors = () => {
    if (this.state.error !== "") {
      return <Message error header={this.state.error} />;
    }
    if (this.props.error !== "") {
      return <Message error header={this.props.error} />;
    }
    return null;
  };

  getNextStep = () => {
    this.setState({ nextStep: (this.state.nextStep += 1) });
  };

  showHidePass = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const error = this.state.error !== "" || this.props.error !== "";
    return (
      <Div className="columns">
        <ImageDiv className="column is-two-thirds">
          <OverLay>
            <SignUpImg src={productShot} alt="coffee shop" />
          </OverLay>
        </ImageDiv>
        <Div className="column">
          <Form onSubmit={this.onSubmit} size="large" error={error}>
            <FormSegment padded>
              <FormH1>SIGN UP</FormH1>
              {this.renderErrors()}
              <Div className="columns">
                <Div className="column is-half">
                  <Form.Field>
                    <Div className="control">
                      <input
                        className="input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleChange}
                        value={this.state.firstName}
                      />
                    </Div>
                  </Form.Field>
                </Div>
                <Div className="column is-half">
                  <Form.Field>
                    <Div className="control">
                      <input
                        className="input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        value={this.state.lastName}
                      />
                    </Div>
                  </Form.Field>
                </Div>
              </Div>
              <Form.Field>
                <Div className="control">
                  <input
                    className="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Div>
              </Form.Field>

              <Div className="field">
                <Div className="control has-icons-right">
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
                </Div>
                <span>&nbsp;&nbsp;</span>
                <Checkbox onClick={this.showHidePass} label="Show password" />
              </Div>
              <Form.Field>
                <Div className="control">
                  <input
                    className="input"
                    type="text"
                    name="birthday"
                    placeholder="DD/MM/YYYY"
                    onChange={this.handleChange}
                    value={this.state.birthday}
                  />
                </Div>
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
              {/* <Divider horizontal>Or</Divider>*/}
              {/* <Button fluid color="blue" size="large">Create Account with Facebook</Button>*/}
              <Header textAlign="center" size="tiny">
                By signing up, you agree to the{" "}
                <Link to="/termsofservice">Terms of Service</Link>.
              </Header>
              <p style={{ textAlign: "center" }}>
                Already have an account? <Link to="/login">Log in</Link>.
              </p>
            </FormSegment>
          </Form>
        </Div>
      </Div>
    );
  }
}

export default SignUp1;
