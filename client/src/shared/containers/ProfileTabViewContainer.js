/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import ProfileTabViewComponent from '../components/ProfileTabViewComponent';
import currentUserQuery from '../../graphql/auth/CurrentUserQuery';
import updateUserMutation from '../../graphql/account/updateUserMutation';

const propTypes = {
  data: React.PropTypes.object.isRequired,
  mutate: React.PropTypes.func.isRequired,
};

class ProfileTabViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        gender: '',
        city: '',
        stateProvince: '',
        country: '',
        bio: '',
      },
    };
  }

  // Apply the graphql query data to state so user can change
  componentWillReceiveProps(nextProps) {
    // when the graphql query comes in, replace the current state with the proper account data
    if (this.props.data.viewer !== nextProps.data.viewer) {
      const { firstName, lastName, gender, city, stateProvince, country, bio } = nextProps.data.viewer.user;
      this.setState({
        user: {
          firstName,
          lastName,
          gender,
          city,
          stateProvince,
          country,
          bio,
        },
      });
    }
  }

  handleChange(event, { name, value }) {
    console.log(this.state);
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  }

  handleSave(event, data) {
    event.preventDefault();
    const { user: stateUser } = this.state;
    const { user: dbUser } = this.props.data.viewer;

    this.props.mutate({
      variables: {
        id: this.props.data.viewer.user.id, // pass the id in to the mutation
        firstName: (stateUser.firstName !== dbUser.firstName ? stateUser.firstName : null),
        lastName: (stateUser.lastName !== dbUser.lastName ? stateUser.lastName : null),
        gender: (stateUser.gender !== dbUser.gender ? stateUser.gender : null),
        city: (stateUser.city !== dbUser.city ? stateUser.city : null),
        stateProvince: (stateUser.stateProvince !== dbUser.stateProvince ? stateUser.stateProvince : null),
        country: (stateUser.country !== dbUser.country ? stateUser.country : null),
        bio: (stateUser.bio !== dbUser.bio ? stateUser.bio : null),
      },
      refetchQueries: [{ query: currentUserQuery }],
    });
  }

  render() {
    return (
      <ProfileTabViewComponent
        loading={this.props.data.loading}
        user={this.state.user}
        onChange={this.handleChange}
        onSubmit={this.handleSave}
      />
    );
  }

}

ProfileTabViewContainer.propTypes = propTypes;

export default compose(
  graphql(currentUserQuery),
  graphql(updateUserMutation)
)(ProfileTabViewContainer);
