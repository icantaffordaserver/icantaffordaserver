/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react';
import { Header, Form, FormInput, Button, Grid, GridColumn, Segment } from 'semantic-ui-react';

const propTypes = {
  user: React.PropTypes.shape({
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    phoneNumber: React.PropTypes.string,
  }).isRequired,
  loading: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  deleteAccount: React.PropTypes.func.isRequired,
};

const defaultProps = {
  loading: false,
};

class MyAccount extends React.Component {
  constructor(props) {
    super(props);

    const { email, phoneNumber } = this.props.user;
    this.state = {
      email,
      password: '',
      phoneNumber: phoneNumber || '',
    };
  }

  handleChange = (event, { name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, { formData: {email, password, phoneNumber} }) => {
    event.preventDefault();
    this.props.onSubmit(email, password, phoneNumber);
  };

  render() {
    const { email, password, phoneNumber } = this.state;
    return (
      <Grid centered container columns={1}>
        <GridColumn width={10}>
          <Segment>
            <Form loading={this.props.loading} onSubmit={this.handleSubmit}>
              <Header content="My Account" textAlign="center" />
              <FormInput
                name="email"
                label="Change Email"
                type="text"
                value={email}
                onChange={this.handleChange}
              />
              <FormInput
                name="password"
                label="Change Password"
                placeholder="Enter your new password"
                type="text"
                value={password}
                onChange={this.handleChange}
              />
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="text"
                value={phoneNumber}
                onChange={this.handleChange}
              />
              <Button positive content="Save" />
            </Form>
            <Header color="red">Danger</Header>
            <Button negative onClick={this.props.deleteAccount}>Delete Account</Button>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}

MyAccount.propTypes = propTypes;
MyAccount.defaultProps = defaultProps;

export default MyAccount;
