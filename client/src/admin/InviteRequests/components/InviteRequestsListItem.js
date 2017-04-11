/**
 * Created by alexandermann on 2017-04-10.
 */
import React from 'react';
import { Table, Checkbox } from 'semantic-ui-react';
import moment from 'moment';

class InviteRequestsListItem extends React.Component {
  static propTypes = {
    isSelected: React.PropTypes.bool.isRequired,
    invite: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  // pass invite id in to onClick function to toggle invite being selected
  handleClick = () => {
    this.props.onClick(this.props.invite.id);
  };

  render() {
    const { isSelected, invite: { name, createdAt, email, referredFrom } } = this.props;
    return (
      <Table.Row onClick={this.handleClick}>
        <Table.Cell collapsing>
          <Checkbox checked={isSelected} onChange={this.handleClick} />
        </Table.Cell>
        <Table.Cell>{moment(createdAt).format('MMM Do, YYYY')}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{referredFrom}</Table.Cell>
      </Table.Row>
    );
  }
}

export default InviteRequestsListItem;
