import styled, { css } from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

const styles = bind(Theme)

export const Tag = styled.p`
  background: #333;
  border-radius: 15px;
  padding: 5px 15px;
  color: #fff;

  margin: 0 !important;
  &:hover {
    color: #333;
    background: #fff;
    border: 1px solid #333;
    padding: 4px 14px;
  }
`
