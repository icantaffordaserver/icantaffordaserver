import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../../../styles/Theme'

import { NavLink } from 'react-router-dom'

const styles = bind(Theme)

export const Footer = styled.div`
  padding: 5px;
  background-color: ${styles.color};
  margin-bottom: 1em;
`
Footer.defaultProps = {
  color: 'primary',
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
