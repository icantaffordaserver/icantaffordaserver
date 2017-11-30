import React, { Component } from 'react'
import styled from 'styled-components'

import ConnectionsTableRow from './ConnectionsTableRow'

class ConnectionsTable extends Component {
  render() {
    const { selectConnection } = this.props
    return (
      <TableContainer>
        <HeaderRow>
          <Header>ID</Header>
          <Header>Start Time</Header>
          <Header>Status</Header>
          <Header>Participants</Header>
        </HeaderRow>
        <RowContainer>
          {this.props.connections &&
            this.props.connections.map(connection => (
              <ConnectionsTableRow
                onClick={() => selectConnection(connection)}
                key={connection.id}
                id={connection.id}
                connectionTime={connection.connectionTime}
                status={connection.status}
                participants={connection.participants}
              />
            ))}
        </RowContainer>
      </TableContainer>
    )
  }
}

export default ConnectionsTable

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
const Header = styled.div`
  width: 100px;
`

const RowContainer = styled.div`
  overflow-y: scroll;
`
