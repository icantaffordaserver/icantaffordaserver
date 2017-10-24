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
          {[...new Array(40)].map(() => (
            <InvitesTableRow
              date={'29/11/2017'}
              name={'Liban Hassan'}
              sentBy={'Georgie'}
              inviteType={'SENT_BY_USER'}
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
  margin-left: 102px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 778px;
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
