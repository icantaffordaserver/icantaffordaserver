/**
 * Created by alexandermann on 2017-03-06.
 */
import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import AccountTabViewComponent from '../components/AccountTabViewComponent';
import updateUserMutation from '../../graphql/account/updateUserMutation';
import currentUserQuery from '../../graphql/auth/CurrentUserQuery';

const propTypes = {
  data: React.PropTypes.object.isRequired,
  mutate: React.PropTypes.func.isRequired,
};

class AccountTabViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      user: {
        email: '',
        password: '',
        phoneNumber: '',
      },
    };
  }

  // Apply the graphql query data to state so user can change
  componentWillReceiveProps(nextProps) {
    // when the graphql query comes in, replace the current state with the proper account data
    if (this.props.data.viewer !== nextProps.data.viewer) {
      const { email, phoneNumber } = nextProps.data.viewer.user;
      this.setState({
        user: {
          email,
          password: '',
          phoneNumber,
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
        email: (stateUser.email !== dbUser.email ? stateUser.email : null),
        password: (stateUser.password !== dbUser.password ? stateUser.password : null),
        phoneNumber: (stateUser.phoneNumber !== dbUser.phoneNumber ? stateUser.phoneNumber : null),
      },
      refetchQueries: [{ query: currentUserQuery }],
    });
  }

  render() {

    return (
      <AccountTabViewComponent
        loading={this.props.data.loading}
        user={this.state.user}
        onChange={this.handleChange}
        onSubmit={this.handleSave}
      />
    );
  }

}

AccountTabViewContainer.propTypes = propTypes;

export default compose(
  graphql(currentUserQuery),
  graphql(updateUserMutation)
)(AccountTabViewContainer);
