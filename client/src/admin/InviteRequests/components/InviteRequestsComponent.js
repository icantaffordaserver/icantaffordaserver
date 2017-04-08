/**
 * Created by alexandermann on 2017-01-25.
 */
import React from 'react';
import moment from 'moment';
import { Header, Button, Checkbox, Icon, Table, Segment } from 'semantic-ui-react';

class InviteRequests extends React.Component {
  static propTypes = {
    invites: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    invites: [],
  };
  state = {
    checkedRequests: [],
  };

  toggleSelectRequest = id => {
    const { checkedRequests } = this.state;
    if (checkedRequests.includes(id)) {
      checkedRequests.splice(checkedRequests.indexOf(id), 1); // remove the id from the array
      this.setState({
        checkedRequests: [...checkedRequests],
      });
    } else {
      this.setState({
        checkedRequests: [...checkedRequests, id], // add the id to the array
      });
    }
  };

  renderInviteList = () => {
    return this.props.invites.map(({ node }) => {
      const { id, email, firstName, lastName, status, modifiedAt } = node;
      if (!this.props.invites.length > 0) return null; // return nothing if an empty array
      if (status === 'sent' || status === 'accepted') return null; // return nothing if invite requested
      return (
        <Table.Row key={id}>
          <Table.Cell collapsing>
            <Checkbox
              checked={this.state.checkedRequests.includes(id)}
              onChange={() => this.toggleSelectRequest(id)}
            />
          </Table.Cell>
          <Table.Cell>{moment(modifiedAt).format('MMM Do, YYYY')}</Table.Cell>
          <Table.Cell>{firstName} {lastName}</Table.Cell>
          <Table.Cell>{email}</Table.Cell>
          <Table.Cell>TBD</Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    // TODO: fix array w/ pro tip https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    return (
      <div>
        <Header as="h2" attached="top">Invite Requests</Header>
        <Segment attached>
          <Table compact celled definition basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Date Requested</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Heard From What Channel</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderInviteList()}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="4">
                  <Button
                    disabled={true}
                    onClick={() => console.log('approve clicked')}
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                  >
                    <Icon name="user" />
                    Approve Invite Request(s)
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default InviteRequests;
