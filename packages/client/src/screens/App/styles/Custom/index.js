import styled from 'styled-components'

export const Tag = styled.div`
  background: #c4c4c4;
  padding: 5px 15px;
  color: #fff;
  border: 1px solid #c4c4c4;
  margin: 0 10px 10px 0;
  &:hover,
  &.selected:hover {
    color: #333;
    background: #fff;
    cursor: pointer;
  }
  &.selected {
    background: green;
    border: 1px solid green;
  }
`
