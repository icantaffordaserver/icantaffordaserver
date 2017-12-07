import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
export const ProfileWrapper = styled.div`
  background: #eee;
  display: grid;
  padding: 5%;
  grid-template-rows: auto auto 100px;
  grid-template-columns: auto;
  grid-template-areas: 'user' 'questions' 'button';
  grid-gap: 20px;
`

export const User = styled.div`
  background: #fff;
  grid-area: user;
  display: grid;
  min-height: 250px;
  grid-template-columns: 250px auto;
  grid-template-rows: auto;
  grid-template-areas: 'photo details';
  grid-gap: 10px;
`

export const UserDetails = styled.div`
  grid-area: details;
  padding: 5%;
`

export const ProfilePhoto = styled.div`
  grid-area: photo;
  opacity: 0.6;
  margin: 8% auto;
  height: 200px;
  width: 200px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    width: 60%;
    font-weight: bold;
  }
  background: #fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #b20a2c,
    #fff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #b20a2c,
    #fff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
export const Tags = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 1% 0;
`

export const QASection = styled.div`
  grid-area: questions;
  display: grid;
  grid-template-columns: 80px auto auto 80px;
  grid-template-rows: auto;
  grid-template-areas: 'left qa qa right';
  grid-gap: 10px;
`

export const QA = styled.div`
  background: #fff;
  padding: 0;
  & > h1 {
    background: #7781c8;
    min-height: 80px;
    font-size: 1.35em;
    padding: 3% 1%;
    margin-top: 0;
    width: 100%;
    color: #fff;
    text-align: center;
  }
`
export const Left = styled(Icon).attrs({
  name: 'chevron left',
  size: 'huge',
})`
  margin: auto !important;
  grid-area: left;

  &:hover {
    cursor: pointer;
    color: #333;
  }
`
export const Right = styled(Icon).attrs({
  name: 'chevron right',
  size: 'huge',
})`
  margin: auto !important;
  grid-area: right;

  &:hover {
    cursor: pointer;
    color: #333;
  }
`
export const Avatar = styled.img`
  height: 200px;
  width: 200px;
  margin: 8% auto;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
`
