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
    padding-top: 3%;
  }
`

export const UserColumn = styled.div`
  &&& {
    display: flex;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    margin: 1%;
    padding: 1%;
    border-radius: 3em;
    background: #f8f8f8;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: ${props => (props.center ? 'center' : 'left')};
  }
`

export const BioParagraph = styled.p`
  &&& {
    padding: 2%;
    font-size: 2.25vh;
  }
`

export const UserColumns = styled.div`
  display: flex;
  &&& {
    padding: 2%;
  }
`
