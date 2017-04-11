/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';

import invitesSentQuery from './invitesSentQuery';
import sendInviteMutation from '../../graphql/sendInviteMutation';
import deleteInvite from '../../graphql/deleteInviteMutation';

import InvitesSentList from './InvitesSentList';

class InvitesSentContainer extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    deleteInviteMutation: React.PropTypes.func.isRequired,
    sendInviteMutation: React.PropTypes.func.isRequired,
  };
  state = {
    loading: false,
    labelMessage: '',
    labelColor: '',
  };

  clearLabel = () => {
    // clear the label after 4 seconds
    setTimeout(() => this.setState({ labelMessage: '' }), 4000);
  };

  deleteInvite = async inviteId => {
    try {
      this.setState({ loading: true });
      await this.props.deleteInviteMutation({
        variables: {
          id: inviteId,
        },
        refetchQueries: [{ query: invitesSentQuery }],
      });
      this.setState({
        loading: false,
        labelColor: 'green',
        labelMessage: 'Invite deleted successfully',
      });
      this.clearLabel();
    } catch (error) {
      this.setState({
        loading: false,
        labelColor: 'red',
        labelMessage: 'Error occurred while trying to delete the invite',
      });
      this.clearLabel();
    }
  };

  resendInvite = async (existingInviteId, email, firstName, lastName) => {
    try {
      this.setState({ loading: true });
      await this.deleteInvite(existingInviteId);

      await this.props.sendInviteMutation({
        variables: {
          invite: {
            email,
            firstName,
            lastName,
            status: 'sent',
            sentById: this.props.data.viewer.user.id,
          },
        },
        refetchQueries: [{ query: invitesSentQuery }],
      });
      this.setState({
        loading: false,
        labelMessage: `Invitation successfully resent to ${email}`,
        labelColor: 'green',
      });
      this.clearLabel();
    } catch (err) {
      this.setState({
        loading: false,
        labelMessage: 'An error occurred while trying to resend the invite',
        labelColor: 'red',
      });
      this.clearLabel();
      console.log(err);
    }
  };

  render() {
    if (this.props.data.loading) return null;
    console.log(this.props.data);
    const invites = this.props.data.viewer.allInvites.edges;
    const { loading, labelMessage, labelColor } = this.state;
    return (
      <InvitesSentList
        labelMessage={labelMessage}
        labelColor={labelColor}
        loading={loading}
        invites={invites}
        deleteInvite={this.deleteInvite}
        resendInvite={this.resendInvite}
      />
    );
  }
}

export default compose(
  graphql(sendInviteMutation, { name: 'sendInviteMutation' }),
  graphql(deleteInvite, { name: 'deleteInviteMutation' }),
  graphql(invitesSentQuery),
)(InvitesSentContainer);
