/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react';
import { Image, Header, Form, FormInput, Button, Grid, GridColumn } from 'semantic-ui-react';

const propTypes = {
  user: React.PropTypes.shape({
    email: React.PropTypes.string,
    password: React.PropTypes.string,
    phoneNumber: React.PropTypes.string,
  }).isRequired,
  loading: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class AccountTabViewComponent extends React.Component {

  render() {
    const { email, password, phoneNumber } = this.props.user;
    return (
      <Grid centered container padded columns={1}>
        <GridColumn width={10}>
          <Image
            shape="circular"
            centered
            src={'https://gravatar.com/avatar/f5f5fd869e834dd4628291a70ec22a4c?s=200&d=monsterid'}
          />
          <Form loading={this.props.loading} onSubmit={this.props.onSubmit}>
            <FormInput
              name="email"
              label="Change Email"
              type="text"
              value={email}
              onChange={this.props.onChange}
            />
            <FormInput
              name="password"
              label="Change Password"
              type="text"
              value={password}
              onChange={this.props.onChange}
            />
            <FormInput
              name="phoneNumber"
              label="Phone Number"
              type="text"
              value={phoneNumber}
              onChange={this.props.onChange}
            />
            <Button positive content="Save" />
          </Form>
          <Header color="red">Danger</Header>
          <Button negative>Delete Account</Button>
        </GridColumn>
      </Grid>
    );
  }

}

AccountTabViewComponent.propTypes = propTypes;

export default AccountTabViewComponent;
