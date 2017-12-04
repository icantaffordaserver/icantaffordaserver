import styled from 'styled-components'

export const PageContainer = styled.div`
  margin-left: 32px;
  width: 100%;
`
export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
export const ConnectionContainer = styled.div`
  height: 600px;
  width: 48%;
  overflow-y: scroll;
`
export const Slot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(22, 23, 26, 0.25);

  :hover {
    box-shadow: 0 2px 12px 0 rgba(22, 23, 26, 0.25);
  }
`
export const Button = styled.button`
  padding: 2% 5%;
  background: #bdef87;
  color: #fff;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5em;
`
export const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 80px;
  flex-grow: 1;
  width: 48%;
  height: 600px;
  display: flex;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  background: #f6f7f8;
`

export const PageTitle = styled.h1`
  margin: 0;
`

export const SearchArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
export const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  background: #f6f7f8;
  border: 1px solid #e1e7ed;
  border-radius: 5px;
  margin-left: 15px;
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-left: 80px;
`

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
`

export const Header = styled.div`
  width: 100px;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 8px;
  font-size: 0.75em;
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
export const RowSection = styled.div`
  display: flex;
  align-items: center;
`
