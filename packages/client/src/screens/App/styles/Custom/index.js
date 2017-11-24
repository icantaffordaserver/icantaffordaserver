import styled from 'styled-components'

export const Tag = styled.div`
  background: #c4c4c4;
  border-radius: 2px solid transparent;
  padding: 5px 15px;
  color: #fff;
  border: ${props =>
    props.isSelected ? '2px solid green' : '1px solid #C4C4C4'};

  margin: 0px 10px 10px 10px !important;
  &:hover {
    color: #c4c4c4;
    background: #fff;
  }
`
