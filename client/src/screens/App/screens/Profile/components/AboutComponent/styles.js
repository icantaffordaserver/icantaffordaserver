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

export const ProfileHeader = styled.h2`
  &&& {
    color: black;
  }
`

export const UserColumn = styled.div`
  &&& {
    box-shadow: 1px 1px 3px black;
    margin: 1%;
    padding: 3%;
    background: white;
  }
`

export const UserColumns = styled.div`
  &&& {
  }
`
