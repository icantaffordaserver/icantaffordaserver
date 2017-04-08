/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { isEmpty, isEmail } from 'validator';
import SendInviteComponent from './SendInviteComponent';
import sendInviteMutation from '../graphql/sendInviteMutation';
import allInvitesQuery from '../InviteRequests/graphql/allInvitesQuery';
import currentUserQuery from '../../graphql/auth/currentUserQuery';

const propTypes = {
  mutate: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

const defaultProps = {};

class SendInviteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelMessage: '',
      labelColor: '',
      loading: false,
    };
  }

  hasFormErrors = (email, firstName, lastName) => {
    if (isEmpty(firstName) || isEmpty(lastName)) {
      this.setState({ labelColor: 'red', labelMessage: 'Fields cannot be blank' });
      return true;
    } else if (!isEmail(email)) {
      this.setState({ labelColor: 'red', labelMessage: 'Please enter a valid email' });
      return true;
    }
    return false;
  };

  sendInvite = async (event, { formData: { email, firstName, lastName } }) => {
    event.preventDefault();
    if (this.hasFormErrors(email, firstName, lastName)) return; // validate form input
    try {
      this.setState({ loading: true });
      await this.props.mutate({
        variables: {
          invite: {
            email,
            firstName,
            lastName,
            status: 'sent',
            sentById: this.props.data.viewer.user.id,
          },
        },
        refetchQueries: [{ query: allInvitesQuery }],
      });
      this.setState({
        loading: false,
        labelMessage: `Invitation sent to ${email}`,
        labelColor: 'green',
      });
      // clear the label after 4 seconds
      setTimeout(() => this.setState({ labelMessage: '' }), 4000);
    } catch (err) {
      this.setState({
        loading: false,
        labelMessage: 'An error occurred while trying to send the invite',
        labelColor: 'red',
      });
      console.log(err);
    }
  };

  render() {
    if (this.props.data.loading) return null;

    const { labelMessage, labelColor, loading } = this.state;
    return (
      <SendInviteComponent
        onSubmit={this.sendInvite}
        labelMessage={labelMessage}
        labelColor={labelColor}
        loading={loading}
      />
    );
  }
}

SendInviteContainer.propTypes = propTypes;
SendInviteContainer.defaultProps = defaultProps;

export default compose(graphql(currentUserQuery), graphql(sendInviteMutation))(SendInviteContainer);