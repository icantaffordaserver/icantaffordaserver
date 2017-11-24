import React, { Component } from 'react'
import styled from 'styled-components'

class InvitesTableRow extends Component {
  render() {
    const { date, name, sentBy, inviteType } = this.props

    return (
      <InviteRow>
        <InviteDate>{date}</InviteDate>
        <InviteName>{name}</InviteName>
        <InviteSentBy>{sentBy}</InviteSentBy>
        <InviteType>{inviteType}</InviteType>
        <RowButton success>Accept</RowButton>
        <RowButton danger>Decline</RowButton>
      </InviteRow>
    )
  }
}

export default InvitesTableRow

const InviteRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  margin-left: 102px;
  background: #fdfdfd;
  width: 778px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(22, 23, 26, 0.25);

  :hover {
    box-shadow: 0 2px 12px 0 rgba(22, 23, 26, 0.25);
  }
`
const InviteDate = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`
const InviteName = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`
const InviteSentBy = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`
const InviteType = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`
const RowButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 24px;
  border-radius: 5px;
  background: ${props => props.success && '#BDEF87'};
  background: ${props => props.danger && '#F68996'};
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  color: white;
`
