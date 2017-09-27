import styled from 'styled-components'

export const Profile = styled.div`
  height: fill-available;
  width: fill-available;
  box-shadow: -60px 0px 100px -90px #d1d1f0;
  display: flex;
  flex-direction: column;
  background: #999;
  background-image: url("${props => props.background}");
  background-size: cover;
  margin: 1%;
  margin-top: 3%;
  opacity: 0.8;
  
`

export const ProfileSection = styled.div`
  height: fill-available;
  width: 100%;
  background: linear-gradient(to top, #ddd, #d1d1f0);
  padding: 60px 5px;
  position: relative;
  margin-top: 20%;
`

export const ProfileAvatar = styled.img`
  position: absolute;
  height: 200px;
  width: 200px;
  top: -150px;
  left: 110px;
  border-radius: 51%;
`
