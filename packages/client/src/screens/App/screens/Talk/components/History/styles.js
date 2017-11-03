import styled from 'styled-components'

export const HistoryList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  color: #000;

  & > :nth-child(2n + 1) {
    background: #333;
    color: #fff;
  }
`

export const HistoryItem = styled.li`
  padding: 1% 5%;
  font-size: 1em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > .name {
    font-weight: bold;
    font-size: 1.25em;
  }
  & > .location {
    font-weight: light;
  }
`
