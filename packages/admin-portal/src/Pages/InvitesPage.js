import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import styled from 'styled-components'

import InvitesTable from '../components/InvitesTable'
import allInvitesQuery from '../graphql/queries/allInvitesQuery'
import gql from 'graphql-tag'

class Home extends Component {
  state = {
    tableState: 'pending',
  }

  setTableState = tableState => {
    this.setState({
      tableState,
    })
  }

  approveInvite = async (e, id) => {
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
    const tableState = this.state.tableState
    const invites =
      tableState === 'pending'
        ? this.props.data.pendingInvites
        : this.props.data.approvedInvites
    return (
      <PageContainer>
        <HeaderContainer>
          <PageTitle>Invites</PageTitle>
          <ToggleContainer>
            <Text bold onClick={() => this.setTableState('pending')}>
              Pending
            </Text>
            <Spacer />
            <Text onClick={() => this.setTableState('approved')}>Approved</Text>
          </ToggleContainer>
          <Button onClick={() => this.props.history.push('/admin/sendInvite')}>
            Send Invite
          </Button>
        </HeaderContainer>
        <TableContainer>
          <InvitesTable
            invites={invites}
            tableState={tableState}
            approveInvite={this.approveInvite}
            deleteInvite={this.deleteInvite}
          />
        </TableContainer>
      </PageContainer>
    )
  }
}

export default compose(graphql(allInvitesQuery), withApollo, withRouter)(Home)

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin-left: 32px;
`

const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 90%;
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

const ToggleContainer = styled.div`
  display: flex;
  margin: 0;
  margin-left: auto;
  margin-right: 80px;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #90c3ff;
  width: 100px;
  height: 24px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
`

const Text = styled.h4`
  margin: 0;
  ${props => (props.bold ? 'font-weight: bold' : 'font-weight: normal')};
  ${props => props.bold && 'color: #668CFF'};
  ${props => !props.bold && 'cursor: pointer'};
`

const Spacer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  border-right: 2px solid black;
`
