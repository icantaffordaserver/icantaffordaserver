import styled from 'styled-components'

/* Text Chat */

export const ChatBox = styled.div`
  width: inherit;
  background: #c4c4c4;
  display: ${props => (props.hidden ? 'none' : 'inherit')};
`
