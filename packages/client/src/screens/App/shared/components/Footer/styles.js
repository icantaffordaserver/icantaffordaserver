import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../../../styles/Theme'

import { NavLink } from 'react-router-dom'

const styles = bind(Theme)

export const FooterWrapper = styled.div`
  height: 60px;
  width: 100%;
  padding: 5px;
  background-color: ${styles.color};
`
FooterWrapper.defaultProps = {
  color: 'primary',
}

export const Footer = styled.div`
  height: 100%;
  width: ${styles.container}%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
Footer.defaultProps = {
  container: 'default',
}

export const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 45%;
`
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

export const Logo = styled.div`
  font-size: 1.25em;
  color: white;
  line-height: 16px;
`
