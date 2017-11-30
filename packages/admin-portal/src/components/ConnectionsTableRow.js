import React, { Component } from 'react'
import styled from 'styled-components'

class ConnectionsTableRow extends Component {
  render() {
    const { id, participants, connectionTime, status } = this.props
    return (
      <Row onClick={this.props.onClick}>
        <RowItem>{id}</RowItem>
        <RowItem>{connectionTime}</RowItem>
        <RowItem>{status}</RowItem>
        <RowItem>{participants.map(u => u.firstName + ', ')}</RowItem>
      </Row>
    )
  }
}

export default ConnectionsTableRow

const Row = styled.div`
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
const RowItem = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`
