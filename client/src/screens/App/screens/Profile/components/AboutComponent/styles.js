import styled from 'styled-components'

export const AboutButton = styled.a`
  &&& {
    width: 35%;
    background: ${props =>
      props.primary ? 'rgba(255,153,0,0.6)' : 'rgba(0,0,255,0.5)'};
    color: black;
    border-radius: 2em;
  }
`

export const ProfileHeader = styled.h1`
  &&& {
    background: rgba(255, 153, 0, 0.6);
    padding: 2%;
    color: black;
  }
`
