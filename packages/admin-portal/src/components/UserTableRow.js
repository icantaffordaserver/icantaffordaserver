import React from 'react'

import styled from 'styled-components'

export default props => {
  const { id, firstName, lastName, email, interests, ...rest } = props
  return (
    <Row {...rest}>
      <div>{id}</div>
      <div>{`${lastName}, ${firstName}`}</div>
      <div>{email}</div>
      <div>{interests.map(i => `${i.name}, `)}</div>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-left: 102px;
  background: #fdfdfd;
  width: 778px;
  min-height: 50px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(22, 23, 26, 0.25);

  :hover {
    box-shadow: 0 2px 12px 0 rgba(22, 23, 26, 0.25);
  }

  &.active {
    background: lightgreen;
  }
`
