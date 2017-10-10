import styled from 'styled-components'

export const ProfileTag = styled.li`
  padding: 8px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
  font-weight: 600;
  border-radius: 3em;
  background: #ddd;
  border: 1px solid #ddd;
  color: white;

  &:hover {
    color: palevioletred;
    background: white;
    border: 1px solid papayawhip;
    cursor: pointer;
  }
`

export default ProfileTag
