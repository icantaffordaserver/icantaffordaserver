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
  background: #f8f8f8;
  padding: 60px 5px;
  position: relative;
  margin-top: 15%;
`

export const ProfileAvatar = styled.img`
  position: absolute;
  height: 200px;
  width: 200px;
  top: -150px;
  left: 110px;
  border-radius: 51%;
`
