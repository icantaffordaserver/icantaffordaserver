import React, { Component } from 'react'
import styled from 'styled-components'

import InvitesTableRow from './InvitesTableRow'

class InvitesTable extends Component {
  render() {
    return (
      <TableContainer>
        <HeaderRow>
          <DateHeader>Date</DateHeader>
          <NameHeader>Name</NameHeader>
          <InvitedByHeader>Invited By</InvitedByHeader>
          <InviteTypeHeader>Invite Type</InviteTypeHeader>
        </HeaderRow>
        <RowContainer>
          {this.props.invites &&
            this.props.invites.map(invite => (
              <InvitesTableRow
                key={invite.id}
                id={invite.id}
                date={invite.createdAt}
                name={invite.firstName + ' ' + invite.lastName}
                sentBy={invite.sentBy && invite.sentBy.firstName}
                inviteType={invite.inviteType}
                tableState={this.props.tableState}
                acceptInvite={this.props.acceptInvite}
                deleteInvite={this.props.deleteInvite}
              />
            ))}
        </RowContainer>
      </TableContainer>
    )
  }
}

export default InvitesTable

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 102px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 60%;
`

const DateHeader = styled.div`
  width: 100px;
`
const NameHeader = styled.div`
  width: 100px;
`
const InvitedByHeader = styled.div`
  width: 100px;
`
const InviteTypeHeader = styled.div`
  width: 100px;
`

const RowContainer = styled.div`
  overflow-y: scroll;
`
