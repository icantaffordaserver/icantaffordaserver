/**
 * Created by alexandermann on 2017-03-30.
 */
import React from 'react';
import { Container, Form } from 'semantic-ui-react';
import PlacesAutocomplete from 'react-places-autocomplete';

import ProfileImageDropzone from './ProfileImageDropzone';

class EditProfileForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      firstName: React.PropTypes.string,
      lastName: React.PropTypes.string,
      gender: React.PropTypes.string,
      location: React.PropTypes.string,
      bio: React.PropTypes.string,
      profilePhoto: React.PropTypes.object,
    }).isRequired,
  };
  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    gender: this.props.user.gender,
    location: this.props.user.location,
    bio: this.props.user.bio,
    droppedPhoto: null,
    existingProfilePhoto: this.props.user.profilePhoto && this.props.user.profilePhoto.blobUrl
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleAddressChange = location => {
    this.setState({ location });
  };

  handleSubmit = (event, { formData }) => {
    event.preventDefault();
    this.props.onSubmit(formData, this.state.droppedPhoto);
  };

  handleDrop = (photo) => {
    this.setState({ droppedPhoto: photo });
  };

  render() {
    const { firstName, lastName, gender, location, bio } = this.state;
    const { profilePhoto } = this.props.user;

    return (
      <Container text>
        <ProfileImageDropzone onDrop={this.handleDrop} src={profilePhoto && profilePhoto.blobUrl} />
        <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
          <Form.Group widths="equal">
            <Form.Input
              name="firstName"
              label="First name"
              placeholder="First name"
              onChange={this.handleChange}
              value={firstName}
            />
            <Form.Input
              name="lastName"
              label="Last name"
              placeholder="Last name"
              onChange={this.handleChange}
              value={lastName}
            />
          </Form.Group>
          <Form.Group inline>
            <label>Gender</label>
            <Form.Radio
              name="gender"
              label="Male"
              value="male"
              checked={gender === 'male'}
              onChange={this.handleChange}
            />
            <Form.Radio
              name="gender"
              label="Female"
              value="female"
              checked={gender === 'female'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field>
            <label>Location</label>
            <PlacesAutocomplete
              inputName="location"
              onChange={this.handleAddressChange}
              value={location || ''}
              placeholder="Where are you from?"
            />
          </Form.Field>
          <Form.TextArea
            name="bio"
            label="Bio"
            placeholder="Tell us more about you..."
            onChange={this.handleChange}
            value={bio || ''}
          />
          <Form.Button positive>Save Profile</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default EditProfileForm;
