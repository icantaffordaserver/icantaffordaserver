import React from 'react'
import styled from 'styled-components'

export default ({ row, onClick }) => {
  return (
    <Row onClick={onClick}>
      {row.map((item, i) => <RowSection key={i}>{item}</RowSection>)}
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
  width: 100%;
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

const RowSection = styled.div`
  min-width: 100px;
`
