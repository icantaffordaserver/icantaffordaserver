import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import moment from 'moment'
import InvitesTable from '../components/ConnectionsTable'
import gql from 'graphql-tag'
import allConnectionsQuery from '../graphql/queries/allUpcomingQuery'

import {
  PageContainer,
  HeaderContainer,
  PageTitle,
  TableContainer,
} from '../styles'

class Home extends Component {
  acceptInvite = async (e, id) => {
    e.preventDefault()
    await this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          updateInvite(id: $id, isApproved: true) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    })

    await this.props.client.resetStore()
  }

  deleteInvite = async (e, id) => {
    e.preventDefault()
    await this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteInvite(id: $id) {
            id
          }
        }
      `,
      variables: {
        id,
      },
    })
    await this.props.client.resetStore()
  }
  render() {
    console.log(this.props.data)
    if (!this.props.data.connections) return null
    const connections = this.props.data.connections.filter(c =>
      moment().isBefore(moment(c.connectionTime)),
    )
    return (
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Connections</PageTitle>
        </HeaderContainer>
        <TableContainer>
          <InvitesTable
            connections={connections}
            acceptInvite={this.acceptInvite}
            deleteInvite={this.deleteInvite}
          />
        </TableContainer>
      </PageContainer>
    )
  }
}

export default compose(graphql(allConnectionsQuery), withApollo)(Home)
