/**
 * Created by alexandermann on 2017-04-10.
 */
import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import moment from 'moment';

const propTypes = {};

const defaultProps = {};

class InvitesSentListItem extends React.Component {
  static propTypes = {
    invite: React.PropTypes.object.isRequired,
    deleteInvite: React.PropTypes.func.isRequired,
    resendInvite: React.PropTypes.func.isRequired,
  };

  deleteInvite = () => {
    this.props.deleteInvite(this.props.invite.id);
  };

  resendInvite = () => {
    const { id, email } = this.props.invite;
    this.props.resendInvite(id, email);
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      isAccepted,
      createdAt,
      sentBy: { firstName: adminFirstName, lastName: adminLastName },
    } = this.props.invite;
    return (
      <Table.Row>
        <Table.Cell>{moment(createdAt).format('MMM Do, YYYY')}</Table.Cell>
        <Table.Cell>{adminFirstName} {adminLastName}</Table.Cell>
        <Table.Cell>{firstName} {lastName}, {email}</Table.Cell>
        <Table.Cell>
          {<Icon name={isAccepted ? 'checkmark' : 'close'} />}
        </Table.Cell>
        <Table.Cell>
          <Button
            size="mini"
            negative
            onClick={this.deleteInvite}
            content="Cancel"
            disabled={isAccepted}
          />
          <Button
            size="mini"
            color="green"
            onClick={this.resendInvite}
            content="Resend"
            disabled={isAccepted}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

InvitesSentListItem.propTypes = propTypes;
InvitesSentListItem.defaultProps = defaultProps;

export default InvitesSentListItem;
