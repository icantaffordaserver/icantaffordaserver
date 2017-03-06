/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react';
import {
  Image,
  Form,
  FormInput,
  FormGroup,
  FormRadio,
  Grid,
  GridColumn,
  Button,
} from 'semantic-ui-react';

const propTypes = {
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

class AccountTabViewComponent extends React.Component {

  render() {
    const { firstName, lastName, gender, city, stateProvince, country, bio } = this.props.user;
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
              name="firstName"
              label="First name"
              type="text"
              value={firstName}
              onChange={this.props.onChange}
            />
            <FormInput
              name="lastName"
              label="Last name"
              type="text"
              value={lastName}
              onChange={this.props.onChange}
            />
            <FormGroup inline>
              <label htmlFor="gender">Gender</label>
              <FormRadio
                name="gender"
                label="Male"
                value="male"
                checked={gender === 'male'}
                onChange={this.props.onChange}
              />
              <FormRadio
                name="gender"
                label="Female"
                value="female"
                checked={gender === 'female'}
                onChange={this.props.onChange}
              />
            </FormGroup>
            <FormInput
              name="city"
              label="City"
              type="text"
              value={city}
              onChange={this.props.onChange}
            />
            <FormInput
              name="stateProvince"
              label="State / Province"
              type="text"
              value={stateProvince}
              onChange={this.props.onChange}
            />
            <FormInput
              name="country"
              label="Country"
              type="text"
              value={country}
              onChange={this.props.onChange}
            />
            <FormInput
              name="bio"
              label="Bio"
              type="text"
              value={bio}
              onChange={this.props.onChange}
            />
            <Button positive content="Save" />
          </Form>
        </GridColumn>
      </Grid>
    );
  }
}

AccountTabViewComponent.propTypes = propTypes;

export default AccountTabViewComponent;
