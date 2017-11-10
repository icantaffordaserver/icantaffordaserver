import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../../../styles/Theme'

import { NavLink } from 'react-router-dom'

const styles = bind(Theme)

export const Navigation = styled.div`
  width: 100%;
  height: 63px;
  background-color: ${styles.color};
  margin-bottom: 1em;
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

export const Logo = styled.div`
  color: ${styles.color};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  & > h1 {
    margin: auto;
  }
  & > img {
    width: 35px;
    height: 29px;
    flex: none;
  }
`
Logo.defaultProps = {
  color: 'accent',
}

export const ConversationCorner = styled.div`
  color: #fff;
  font-size: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2vw;
`
