/**
 * Created by alexandermann on 2017-04-12.
 */
import styled from 'styled-components';

export const HeaderMenu = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #05ffb0;
  height: 70px;
  margin-bottom: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  position: relative;
  height: 100%;
  max-width: 1000px;
  //border: 1px black solid;
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  //border: 1px red solid;
  padding: ${props => props.avatar ? '0px' : '5px 15px 5px 15px'};
  &:hover {
    transition-duration: 0.2s;
    transition-timing-function: ease;
    cursor: pointer;
    box-shadow: 0px 5px 0 #98004a;
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
