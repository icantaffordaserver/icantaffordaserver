/**
 * Created by alexandermann on 2017-04-12.
 */
import styled, { keyframes, css } from 'styled-components'

export const SideNav = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: fixed;
  width: 63px;
  min-width: 60px;
  background: #444343; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #444343,
    #7c7c8f
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #444343,
    #7c7c8f
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 3px 0px 2px #555;
  z-index: 1;
  font-family: Lato;
`

export const SideNavMenu = styled.div`
  margin-top: 25%;
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-left: 0%;
`
export const SideNavMenuItem = styled.h4`
  color: #000;
  text-align: center;
  font-size: 1.5vw;
  font-family: Lato;
  font-weight: 300;
  width: 100%;
  padding: 5% 0;
  ${props =>
    props.active &&
    css`
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: -10px 0px 0px #fff;
      color: #fff;
      cursor: pointer;
    `} &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: -10px 0px 0px #fff;
    color: #fff;
    cursor: pointer;
  }
`

export const UserDetails = styled.div`
  position: fixed;
  bottom: 25px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
export const Logo = styled.div`
  height: 5em;
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

export const Feedback = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.1);
  font-size: 2vw;
  width: 100%;
  padding: 5% 0;
  margin: 4% 0;
`

export const UserButton = styled.button`
  border: none;
  text-decoration: underline;
  padding: 0;
  margin: 0 5px;
  background: transparent;
  font-size: 1vw;
  color: #333;
`
