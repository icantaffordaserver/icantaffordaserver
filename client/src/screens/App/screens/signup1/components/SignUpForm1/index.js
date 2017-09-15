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
  FormSegment,
  FormHeaderP,
  FormNextButton,
  FormSubmitButton,
  ImageH1
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

class SignUp1 extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    SignUpStepTwo: PropTypes.element
  };
  static defaultProps = {
    error: ""
  };

  state = {
    error: "",
    showPassword: false,
    formStep: 0
  };

  onSubmit = (event, data) => {
    event.preventDefault(); // prevent page reload
    this.setState({ error: "" }); // clear any old errors
    const {
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      timeZone,
      interests = []
    } = data.formData;
    const signUpErrors = validateSignUp(
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      timeZone
    );
    if (typeof signUpErrors === "string") {
      // if validate sign up returns string we have an error
      this.setState({
        error: signUpErrors
      });
      return;
    }
    this.props.onSubmit({
      firstName,
      lastName,
      email,
      password,
      birthday,
      bio,
      timeZone
    });
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
    this.setState({ formStep: (this.state.formStep += 1) });
  };

  goBack = () => {
    this.setState({ formStep: (this.state.formStep -= 1) });
  };

  showHidePass = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  FormSection1() {
    const error = this.state.error !== "" || this.props.error !== "";
    return (
      <Form onSubmit={this.onSubmit} size="large" error={error}>
        <FormSegment padded>
          <FormH1>SIGN UP</FormH1>
          <Div className="columns">
            <Div className="column">
              <FormHeaderP>Account Info</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Select Interests</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Personal Bio</FormHeaderP>
            </Div>
          </Div>
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

          {/* <Button
        fluid
        color="teal"
        size="large"
        loading={this.props.loading}
      >
        Create Account
      </Button> */}
          <FormNextButton
            className="button is-primary"
            onClick={this.getNextStep}
          >
            Select your interests!
          </FormNextButton>
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
    );
  }

  FormSection2() {
    const error = this.state.error !== "" || this.props.error !== "";
    return (
      <Form onSubmit={this.onSubmit} size="large" error={error}>
        <FormSegment padded>
          <FormH1>SIGN UP</FormH1>
          <Div className="columns">
            <Div className="column">
              <FormHeaderP>Account Info</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Select Interests</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Personal Bio</FormHeaderP>
            </Div>
          </Div>
          {this.renderErrors()}
          <Form.Field>
            <Div className="columns">
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
            </Div>
            <Div className="columns">
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
              <Div className="column">
                <img
                  style={{ borderRadius: "50px" }}
                  src="http://bulma.io/images/placeholders/64x64.png"
                />
                <p>Interest Name</p>
              </Div>
            </Div>
          </Form.Field>
          <Form.Field>
            <Div className="control">
              <input
                className="input"
                type="text"
                name="interests"
                placeholder="List any other interests you have!"
                onChange={this.handleChange}
                value={this.state.interests}
              />
            </Div>
          </Form.Field>

          {/* <Button
              fluid
              color="teal"
              size="large"
              loading={this.props.loading}
            >
              Create Account
            </Button> */}
          <Div className="columns">
            <Div className="column">
              <FormNextButton
                className="button is-primary"
                onClick={this.goBack}
              >
                Go back
              </FormNextButton>
            </Div>
            <Div className="column">
              <FormNextButton
                className="button is-primary"
                onClick={this.getNextStep}
              >
                Tell us a bit more!
              </FormNextButton>
            </Div>
          </Div>
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
    );
  }
  FormSection3() {
    const error = this.state.error !== "" || this.props.error !== "";
    return (
      <Form onSubmit={this.onSubmit} size="large" error={error}>
        <FormSegment padded>
          <FormH1>SIGN UP</FormH1>
          <Div className="columns">
            <Div className="column">
              <FormHeaderP>Account Info</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Select Interests</FormHeaderP>
            </Div>
            <Div className="column">
              <FormHeaderP>Personal Bio</FormHeaderP>
            </Div>
          </Div>
          {this.renderErrors()}
          <p style={{ FontSize: "2em" }}>
            What are your interests? What are your passions? Are you a cat
            person or a dog person? Share anything you want here!
          </p>
          <Form.Field>
            <Div className="field">
              <Div className="control">
                <textarea
                  style={{ resize: "none" }}
                  className="textarea"
                  name="bio"
                  onChange={this.handleChange}
                  value={this.state.bio}
                />
              </Div>
            </Div>
          </Form.Field>

          <Form.Field>
            <Div className="control">
              <input
                className="input"
                type="text"
                name="timeZone"
                placeholder="TimeZone"
                onChange={this.handleChange}
                value={this.state.timeZone}
              />
            </Div>
          </Form.Field>

          <Div className="columns">
            <Div className="column">
              <FormNextButton
                className="button is-primary"
                onClick={this.goBack}
              >
                Go back
              </FormNextButton>
            </Div>
            <Div className="column">
              <FormSubmitButton
                className="button is-primary is-fullwidth"
                loading={this.props.loading}
              >
                Create Account
              </FormSubmitButton>
            </Div>
          </Div>
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
    );
  }
  render() {
    let form = null;
    if (this.state.formStep === 0) {
      form = this.FormSection1();
    }
    if (this.state.formStep === 1) {
      form = this.FormSection2();
    }
    if (this.state.formStep === 2) {
      form = this.FormSection3();
    }

    return (
      <Div className="columns">
        <ImageDiv className="column is-two-thirds">
          <OverLay>
            <SignUpImg src={productShot} alt="coffee shop" />
            <ImageH1 style={{fontFamily: "fabfeltscriptbold"}}>Toktumi</ImageH1>
          </OverLay>
        </ImageDiv>
        <Div className="column">{form}</Div>
      </Div>
    );
  }
}

export default SignUp1;
