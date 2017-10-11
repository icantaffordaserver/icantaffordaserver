import styled from 'styled-components'

export const CardTag = styled.li`
  padding: 3px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-weight: 600;

  background: #ddd;
  border: 1px solid #ddd;

  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;

  color: #ffffff;

  &:hover {
    color: palevioletred;
    background: white;
    border: 1px solid papayawhip;
    cursor: pointer;
  }
`

export default CardTag
