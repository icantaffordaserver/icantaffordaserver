/**
 * Created by alexandermann on 2017-04-12.
 */
import styled, { keyframes, css } from "styled-components";

export const SideNav = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: fixed;
  min-width: 250px;
  padding-top: 2em;
  background: #ff7f50; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ff7f50,
    #ff9839
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ff7f50,
    #ff9839
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 3px 0px 2px #555;
  z-index: 1;
  font-family: Lato;
`;

export const SideNavMenu = styled.div`
  margin-top: 25%;
  height: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0%;
`;
export const SideNavMenuItem = styled.h4`
  color: #000;
  font-size: 1.5vw;
  font-family: Lato;
  font-weight: 300;
  width: 100%;
  padding: 5% 0;
  padding-left: 20%;
  ${props =>
    props.active &&
    css`
      background-color: rgba(0, 0, 0, 0.1);
      border-left: solid 3px #fff;
      color: #fff;
      padding-left: 19%;
      cursor: pointer;
    `} &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-left: solid 3px #fff;
    color: #fff;
    padding-left: 19%;
    cursor: pointer;
  }
`;

export const UserDetails = styled.div`
  position: fixed;
  bottom: 25px;
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: center;
`;
export const Logo = styled.div`
  height: 5em;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;

export const Feedback = styled.button`
  border: none;
  background: rgba(255, 255, 255, 0.1);
  font-size: 2vw;
  width: 100%;
  padding: 5% 0;
  margin: 4% 0;
`;

export const UserButton = styled.button`
  border: none;
  text-decoration: underline;
  padding: 0;
  margin: 0 5px;
  background: transparent;
  font-size: 1vw;
  color: #333;
`;
