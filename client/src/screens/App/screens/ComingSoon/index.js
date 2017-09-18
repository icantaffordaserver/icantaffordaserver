/**
 * Created by alexandermann on 2017-04-28.
 */
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { gql, graphql, compose } from "react-apollo";
import styled from "styled-components";
import { Button, Form, Label } from "semantic-ui-react";
import { isEmail } from "validator";

import logo from "../../shared/assets/logo.png";
import currentUserQuery from "../../shared/graphql/queries/currentUserQuery";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  max-width: 600px;
`;
const Logo = styled.img`width: 100%;`;

class ComingSoon extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  state = {
    name: "",
    email: "",
    loading: false,
    message: "",
    error: false
  };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { name, email } = this.state;
    console.log(name, email);
    this.setState({ error: false, message: "" }); // clear the current message
    if (!isEmail(email)) {
      this.setState({ message: "Please enter a valid email" });
      return;
    }
    try {
      this.setState({ loading: true });
      await this.props.mutate({
        variables: { input: { name, email, referredFrom: "webapp" } }
      });
      this.setState({ loading: false, message: "Request Sent Successfully" });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: true,
        message: "An error occurred, please try again later"
      });
    }
  };

  render() {
    if (this.props.data.loading) return null;
    if (this.props.data && this.props.data.user)
      return <Redirect to="/profile" />;
    const { loading, error, message } = this.state;

    return (
      <SignUpContainer>
        <Logo alt="logo" src={logo} />
        <h1>Welcome to the community.</h1>
        <h2>
          We are currently in closed beta, to request access send us your email
          and we'll be sure to get in touch
        </h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            name="name"
            size="big"
            placeholder="Enter your name"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            name="email"
            size="big"
            placeholder="Enter your email"
            onChange={this.handleChange}
          />
          <Button
            size="big"
            color="teal"
            labelPosition="right"
            icon="send"
            content="Request"
            loading={loading}
          />
          {message && (
            <Label basic color={error ? "red" : "green"} pointing="left">
              {message}
            </Label>
          )}
        </Form>
      </SignUpContainer>
    );
  }
}

export default compose(
  graphql(currentUserQuery),
  graphql(
    gql`
      mutation($input: CreateInviteRequestsInput!) {
        createInviteRequests(input: $input) {
          changedInviteRequests {
            email
          }
        }
      }
    `
  )
)(ComingSoon);
