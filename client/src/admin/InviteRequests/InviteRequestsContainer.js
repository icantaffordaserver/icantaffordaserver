/**
 * Created by alexandermann on 2017-03-08.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'

import InviteRequestsComponent from './components/InviteRequestsList'
import allInviteRequestsQuery from './graphql/allInviteRequestsQuery'
import sendInviteMutation from '../graphql/sendInviteMutation'
import approveInviteRequestMutation from './graphql/approveInviteRequestMutation'
import invitesSentQuery from '../Dashboard/InvitesSent/invitesSentQuery'

class InviteRequestsContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    sendInviteMutation: PropTypes.func.isRequired,
    approveInviteRequestMutation: PropTypes.func.isRequired,
  }
  state = {
    loading: false,
  }

  getFirstAndLastName = name => {
    if (!name) return { firstName: '', lastName: '' } // name is not specified
    let [firstName, lastName] = name.split(' ')
    lastName = lastName !== '' ? lastName : null
    return { firstName, lastName }
  }

  sendInvites = async selectedInviteRequests => {
    try {
      this.setState({ loading: true }) // display loading in the approved button
      const inviteRequests = this.props.data.viewer.allInviteRequests.edges
      // get all the selected inviteRequests and put in one array
      const approvedRequests = inviteRequests
        .filter(({ node: invite }) => selectedInviteRequests.includes(invite.id))
        .map(inviteNode => inviteNode.node) // strip the node prop and return just the invite data

      let promises = []
      approvedRequests.forEach(({ id, email, name }) => {
        // if there is a first name and last name in the name field split into two
        const { firstName, lastName } = this.getFirstAndLastName(name)
        // add all the promises of the invites sent to an array and wait for all to finish
        promises.push(
          this.props.sendInviteMutation({
            variables: {
              invite: {
                email,
                firstName,
                lastName,
                status: 'sent',
                inviteRequestId: id,
                sentById: this.props.data.viewer.user.id,
              },
            },
          }),
        )
      })
      await Promise.all(promises)

      // clear the existing array and now loop over existing invite requests and update their status to approved
      promises = []
      selectedInviteRequests.forEach(id => {
        promises.push(
          this.props.approveInviteRequestMutation({
            variables: {
              inviteRequest: {
                id,
                isApproved: true,
              },
            },
            refetchQueries: [{ query: allInviteRequestsQuery }, { query: invitesSentQuery }],
          }),
        )
      })
      await Promise.all(promises)
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  render() {
    if (this.props.data.loading) return null

    const { loading } = this.state
    const invites = this.props.data.viewer.allInviteRequests.edges
    return (
      <InviteRequestsComponent loading={loading} invites={invites} sendInvites={this.sendInvites} />
    )
  }
}

export default compose(
  graphql(allInviteRequestsQuery, { options: { pollInterval: 10000 } }),
  graphql(sendInviteMutation, { name: 'sendInviteMutation' }),
  graphql(approveInviteRequestMutation, { name: 'approveInviteRequestMutation' }),
)(InviteRequestsContainer)
