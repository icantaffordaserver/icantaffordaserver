import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

import { Button as button } from 'semantic-ui-react'

const styles = bind(Theme)

export const Button = styled(button)`
  transition: all 0.25s ease !important;
  padding: 5% 0 !important;
  background: #fff !important;
  border: solid 1px #ff9839 !important;
  border-radius: 5px !important;
  margin-bottom: 10% !important;
  font-size: 2em !important;
  color: ${styles.color}!important;
  line-height: 0 !important;
  &:hover {
    color: #fff !important;
    border: solid 1px #ff9839 !important;
    background: #ff9839 !important;
  }
`
Button.defaultProps = {
  color: 'accent',
}
