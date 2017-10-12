import styled from 'styled-components'

export const UpcomingTag = styled.li`
  padding: 3px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-weight: 600;
  border-radius: 3px

  background: #ddd;
  border: 1px solid #ddd;

  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 9px;

  color: #ffffff;

  &:hover {
    color: palevioletred;
    background: white;
    border: 1px solid papayawhip;
    cursor: pointer;
  }
`

export default UpcomingTag
