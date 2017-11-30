import React from 'react'
import styled from 'styled-components'

import TableRow from './TableRow'

export default ({ headers, rows }) => {
  console.log(rows)
  return (
    <TableContainer>
      <HeaderRow>
        {headers.map((item, i) => <Header key={i}> {item} </Header>)}
      </HeaderRow>
      {rows.map((row, i) => <TableRow row={row} />)}
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
