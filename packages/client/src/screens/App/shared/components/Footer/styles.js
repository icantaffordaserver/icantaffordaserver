import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Footer = styled.div`
  position: relative;
  height: 60px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  background: #393f63;
`

export const Links = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  width: 45%;
  font-size: 1vw;
  position: absolute;
  right: 0;
`
export const Link = styled(NavLink)`
  transform: all 0.25s ease;
  color: #fff;
  font-size: 1.25rem;
  &:hover,
  &.active {
    color: #fff;
    border-bottom: 3px solid #ff7f50;
    margin-bottom: -3px;
  }
`

export const Brand = styled.div`
  font-size: 1.25em;
  color: white;
  line-height: 16px;
  position: absolute;
  left: 45%;
`
