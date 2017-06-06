/**
 * Created by alexandermann on 2017-01-25.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Header, Button, Table, Segment } from 'semantic-ui-react'
import InviteRequestsListItem from './InviteRequestsListItem'

class InviteRequests extends React.Component {
  static propTypes = {
    invites: PropTypes.array.isRequired,
    sendInvites: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  state = {
    selectedInviteRequests: [],
  }

  toggleSelectInviteRequest = id => {
    const { selectedInviteRequests } = this.state
    if (selectedInviteRequests.includes(id)) {
      // remove the id from the array
      this.setState({
        selectedInviteRequests: selectedInviteRequests.filter(idInArray => id !== idInArray),
      })
    } else {
      // add the id to the array
      this.setState({
        selectedInviteRequests: [...selectedInviteRequests, id],
      })
    }
  }

  approveInviteRequests = () => {
    this.props.sendInvites(this.state.selectedInviteRequests)
  }

  render() {
    const { invites, loading } = this.props
    const { selectedInviteRequests } = this.state
    return (
      <div>
        <Header as="h2" attached="top">
          Invite Requests
        </Header>

        <Segment attached>
          <Table compact celled selectable definition basic="very">
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
              {invites.map(({ node: invite }) => (
                <InviteRequestsListItem
                  key={invite.id}
                  isSelected={selectedInviteRequests.includes(invite.id)}
                  invite={invite}
                  onClick={this.toggleSelectInviteRequest}
                />
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="4">
                  <Button
                    loading={loading}
                    content={
                      selectedInviteRequests.length > 1
                        ? 'Approve Invite Requests'
                        : 'Approve Invite Request'
                    }
                    disabled={!selectedInviteRequests.length}
                    onClick={this.approveInviteRequests}
                    floated="right"
                    icon="user"
                    labelPosition="left"
                    primary
                    size="small"
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    )
  }
}

export default InviteRequests
