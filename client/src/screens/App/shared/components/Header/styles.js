/**
 * Created by alexandermann on 2017-04-12.
 */
import styled, { keyframes } from 'styled-components';

const animateDropdown = keyframes`
  from {
    opacity: 0;
    transform: rotateY(-90deg) translateY(-30px);
  }
  
  to {
    opacity: 1;
    transform: rotateY(0deg) translateY(0px);
  }
`;

export const HeaderMenu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FF7F50;
  height: 70px;
  margin-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  z-index: 999;
`;

export const HeaderItemContainer = styled.ul`
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  height: 100%;
  max-width: 1000px;
  //border: 1px black solid;
`;

export const HeaderItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  //border: 1px red solid;
  padding: ${props => props.avatar ? '0px' : '5px 15px 5px 15px'};
  &:hover {
    transition-duration: 0.2s;
    transition-timing-function: ease;
    cursor: pointer;
    box-shadow: 0px 5px 0 white;
  }
`;

export const Logo = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const HeaderRightMenu = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
`;

export const Avatar = styled.img`
  height: 70%;
  border-radius: 50%;
`;

export const Email = styled.h3`
  margin: 0;
  padding: 10px;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 110px;
  z-index: 999;
  > h4 {
    margin: 0;
  }
  &:hover {
    // transition-duration: 0.2s;
    // transition-timing-function: ease;
    // cursor: pointer;
    // box-shadow: 0px 5px 0 #98004a;
    > ul li {
      animation: ${animateDropdown} 0.3s ease-in-out;
      display: flex;
    }
  }
`;

export const DropMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100%;
  left: 0%;
  width: 100%;
  padding: 0;
  z-index: 999;
`;

export const DropMenuItem = styled.li`
  background-color: #FF7C58;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 60px;
  line-height: 60px;
  //border: 1px red solid;
  display: none;
  opacity: 1;
  z-index: 999;
  &:hover {
    cursor: pointer;
    box-shadow: 5px 0px 0 white;
  }
  > h4 {
    margin: 0;
  }
`;
