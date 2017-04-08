/**
 * Created by alexandermann on 2017-04-06.
 */
import React from 'react';
import { Header, Image, Checkbox, TableRow, TableCell } from 'semantic-ui-react';
import moment from 'moment';

class ConnectionQueueTableRow extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    comment: React.PropTypes.string.isRequired,
    user: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selectedUsers: React.PropTypes.array.isRequired,
  };

  handleClick = () => {
    const { index, id } = this.props;
    this.props.onClick(index, id);
  };

  isSelected = () => {
    const { selectedUsers, id } = this.props;
    return selectedUsers.includes(id);
  };

  render() {
    const { createdAt, comment, user } = this.props;
    return (
      <TableRow onClick={this.handleClick}>
        <TableCell><Checkbox fitted checked={this.isSelected()} /></TableCell>
        <TableCell>{moment(createdAt).format('MMM Do, YYYY')}</TableCell>
        <TableCell singleLine>
          <Header as="h4" image>
            <Image
              src={user.profilePhoto ? user.profilePhoto.blobUrl : 'https://i2.wp.com/static.teamtreehouse.com/assets/content/default_avatar-d5ee029fdb4c0604d314eb946dbf8e6a.png?ssl=1'}
              shape="rounded"
              size="mini"
            />
            <Header.Content>
              {`${user.firstName} ${user.lastName}`}
              <Header.Subheader>{user.location || 'Location not set'}</Header.Subheader>
            </Header.Content>
          </Header>
        </TableCell>
        <TableCell>
          {comment || 'No comments left'}
        </TableCell>
      </TableRow>
    );
  }
}

export default ConnectionQueueTableRow;
