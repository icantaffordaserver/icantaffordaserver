import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import styled from 'styled-components'
import moment from 'moment'
import InvitesTable from '../components/ConnectionsTable'
import gql from 'graphql-tag'
import allConnectionsQuery from '../graphql/queries/allUpcomingQuery'

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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  width: 960px;
  height: 100%;
  margin-left: 32px;
`

const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 960px;
  display: flex;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  background: #f6f7f8;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-left: 80px;
`

const PageTitle = styled.h1`
  margin: 0;
`
