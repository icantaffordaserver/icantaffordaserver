import styled, { keyframes, css } from 'styled-components'

export const UserImage = styled.img`
  border-radius: 80px;
  height: 100px;
`
export const UpcomingContainer = styled.div``

export const UserInfo = styled.div`padding: 3%;`
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  border-top: 1px solid #828282;
  min-height: 220px;
`
export const ProfileImageWrapper = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`
export const RequestButton = styled.button`
  width: 54%;
  background: ${props =>
    props.primary
      ? 'linear-gradient(180deg, #ff9839 0%, #ff7f50 100%)'
      : 'linear-gradient(180deg, #ff6a83 0%, #bf000a 98.9%)'};
  border: none;
  padding: 2%;
  margin: 1vh;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
`
export const ButtonWrapper = styled.div`
  display: flex !important;
  justify-content: space-around !important;
  align-items: center !important;
  flex-flow: column;
`
