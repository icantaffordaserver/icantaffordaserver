import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../../../styles/Theme'

import { NavLink } from 'react-router-dom'

const styles = bind(Theme)

export const Navigation = styled.div`
  width: 100%;
  padding: 5px;
  background-color: ${styles.color};
  margin-bottom: 1em;
  position: relative;
`
Navigation.defaultProps = {
  color: 'primary',
}

export const NavigationContainer = styled.div`
  width: 65%;
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
  width: 30%;
  align-items: center;
  justify-content: space-between;
  color: ${styles.color};
`
NavigationLinks.defaultProps = {
  color: 'accent',
}

export const Link = styled(NavLink)`
  transform: all 0.25s ease;
  color: ${styles.color};
  font-size: 1.25em;
  &:hover,
  &.active {
    color: ${styles.color};
    border-bottom: 3px solid #ff7f50;
    margin-bottom: -3px;
  }
`
Link.defaultProps = {
  color: 'white',
}

export const Logo = styled.h1`
  color: ${styles.color};
  margin: 0;
`
Logo.defaultProps = {
  color: 'accent',
}

export const ConversationCorner = styled.div`
  position: absolute;
  right: 80px;
  top: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`
