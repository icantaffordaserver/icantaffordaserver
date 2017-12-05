import React from 'react'
import styled from 'styled-components'
import UserTableRow from './UserTableRow'

export default props => {
  const { users, selectUser } = props
  return (
    <TableContainer>
      <HeaderRow>
        <Header>ID</Header>
        <Header>Name</Header>
        <Header>Email</Header>
        <Header>Interests</Header>
      </HeaderRow>
      {users.map(user => (
        <UserTableRow
          onClick={() => selectUser(user)}
          className={props.currentUser === user && 'active'}
          key={user.id}
          {...user}
        />
      ))}
    </TableContainer>
  )
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
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
