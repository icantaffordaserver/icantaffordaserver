import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../../../styles/Theme'
import { Box } from 'grid-styled'

import { NavLink } from 'react-router-dom'

const styles = bind(Theme)

export const Navigation = styled.div`
  width: 100%;
  height: 63px;
  background-color: ${styles.color};
  position: relative;
  flex: none;
`
Navigation.defaultProps = {
  color: 'primary',
}

export const NavigationContainer = styled.div`
  width: 65%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h1 {
    margin: 0 !important;
  }
`
NavigationContainer.defaultProps = {
  container: 'default',
}

export const NavigationLinks = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
`

export const Link = styled(NavLink)`
  transform: all 0.25s ease;
  font-size: 1.25em;
  height: 100%;
  width: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  &:hover,
  &.active {
    background: rgba(0, 0, 0, 0.2);
  }
`

export const DropDownLink = styled(NavLink)`
  color: white;
  &:hover {
    color: white;
  }
`

export const Logo = styled.img`
  height: 30px;
`

export const ConversationCorner = styled.div`
  color: #fff;
  font-size: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2vw;
`
export const TallBox = styled(Box)`
  height: auto;
`

export const WhiteBox = styled(Box)`
  color: white;
`
