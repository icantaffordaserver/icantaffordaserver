import styled from 'styled-components'
export const Profile = styled.div`
  height: fill-available;
  width: fill-available;
  box-shadow: -60px 0px 100px -90px #000;
  display: flex;
  flex-direction: column;
  background: #999;
`

export const ProfileSection = styled.div`
  height: fill-available;
  width: 100%;
  background: #fff;
  padding: 60px;
  position: relative;
  margin-top: 20%;
`

export const ProfileAvatar = styled.img`
  position: absolute;
  height: 200px;
  width: 200px;
  top: -150px;
  left: 40px;
  border-radius: 51%;
`
