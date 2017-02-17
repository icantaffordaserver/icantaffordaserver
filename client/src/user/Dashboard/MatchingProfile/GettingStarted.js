/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react';
import { Header, Container, Button } from 'semantic-ui-react';

class GettingStarted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const firstName = 'Alex';
    return (
      <div>
        <Header as="h1" textAlign="center">Hey {this.props.profile.first_name}</Header>
        <Container>
          Here we are going to talk a little bit about Shift and the beta and cofounders
        </Container>
        <Container>
          Here we are going to talk a little bit about the process and what we want to achieve
        </Container>
        <Button
          fluid
          positive
          onClick={this.props.handleGetStarted}
        >
          Let's get started, take me to the profile builder
        </Button>
      </div>
    );
  }
}

export default GettingStarted;
