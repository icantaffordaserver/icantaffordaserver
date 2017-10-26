import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

import { Button as button } from 'semantic-ui-react'

const styles = bind(Theme)

export const Button = styled(button)`
  transition: all 0.25s ease !important;
  padding: ${styles.padding}% !important;
  width: ${props => (props.fullWidth ? 100 : styles.size)}%;
  background: ${styles.color}!important;
  border: solid 1px ${styles.color}!important;
  border-radius: 5px !important;
  margin: auto !important;
  font-size: ${styles.fontSize}em !important;
  color: #fff !important;
  &:hover {
    color: ${styles.color}!important;
    border: solid 1px ${styles.color}!important;
    background: #fff !important;
  }
`
Button.defaultProps = {
  color: 'accent',
  size: 'medium',
  fontSize: 'medium',
  padding: 'medium',
}

export const Input = styled.input`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
`

export const TextArea = styled.textarea`
  flex: 1 1 auto;
  width: fill-available;
  padding: 10px;
  font-size: 1.25em;
  border: solid 1px lightgray;
  border-radius: 5px;
  height: 250px;
`
