import styled from 'styled-components'

export const Profile = styled.div`
  height: fill-available;
  width: fill-available;
  box-shadow: -60px 0px 100px -90px #d1d1f0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to left, #ff7f50, #ff9839);
`

export const ProfileSection = styled.div`
  width: 100%;
  flex-wrap: wrap;
  background: white;
  border-radius: 'square';
  shadow: 'none';
`

export const ProfileAvatar = styled.img`
  height: 200px;
  width: 200px;

  border-radius: 51%;
`
export const TrophyContainer = styled.div`
  background: ${props =>
    `linear-gradient(0deg,${props.bottomColor}, ${props.topColor})`};
  align-items: center;
  justify-content: space-between;
  box-shadow: none;
  padding: 2% 5%;
  height: 400px;
`
export const FireStarterContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  background: white;
  border-radius: 'square';
  shadow: 'none';
`
export const TrophyColorPicker = styled.div`
  width: 95%;
  height: 50px;
  background: ${props =>
    `linear-gradient(0deg,${props.bottomColor}, ${props.topColor})`};
  margin: 10px;
  border: ${props =>
    props.isSelected ? '2px solid green' : '1px solid #C4C4C4'};
`

export const Button = styled.button`
  transition: all 0.25s ease !important;
  padding: 2% !important;
  width: 100%;
  height: 50px;
  background: ${props => props.color};
  border: solid 1px ${props => props.color};
  border-radius: 30px;
  font-size: 14px;
  color: ${props => props.inverseColor};
  &:hover {
    color: ${props => (props.noHoverChange ? props.inverseColor : props.color)};
    border: solid 1px
      ${props => (props.noHoverChange ? props.inverseColor : props.color)};
    background: ${props =>
      props.noHoverChange ? props.color : props.inverseColor};
  }
`

export const SuggestionSubmitButton = styled.button`
  transition: all 0.25s ease !important;
  padding: 2% !important;
  width: 40%;
  background: #219653 !important;
  border: solid 1px #219653 !important;
  font-size: 1.1em !important;
  color: #fff !important;
  &:hover {
    color: #219653 !important;
    border: solid 1px #219653 !important;
    background: #fff !important;
  }
`
