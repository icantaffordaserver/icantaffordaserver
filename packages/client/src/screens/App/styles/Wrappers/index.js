import styled, { css } from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

import { Card as card } from 'semantic-ui-react'

const styles = bind(Theme)

export const Background = styled.div`
  background: ${styles.color};
`
Background.defaultProps = {
  color: 'gray',
}

export const Screen = styled.div`
  height: 100%;
  width: ${styles.container}%;
  margin: auto;
`
Screen.defaultProps = {
  container: 'default',
}

export const Content = styled.div`
  background: ${styles.color};
  display: flex;
  flex-direction: column;
  width: ${styles.container}%;
  align-items: center;
  justify-content: space-between;
  border-radius: ${styles.borderRadius}px;
  box-shadow: ${styles.shadow};
  padding: 2% 5%;
  margin: 2% auto;
`
Content.defaultProps = {
  color: 'white',
  borderRadius: 'default',
  container: 'default',
  shadow: 'none',
}

export const Form = styled.form`
  display: flex;
  margin: 1% auto;
  justify-content: space-between;
  flex-direction: column;
  width: ${styles.container}%;
`
Form.defaultProps = {
  container: 'default',
}

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`
export const ColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 1% auto;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.center && 'center'};
  background: ${styles.color};
`
ColumnContainer.defaultProps = {
  color: 'transparent',
}
export const RowContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

export const Section = styled.section`
  width: 100%;
  padding: 2%;
  flex-wrap: wrap;
  background: ${styles.color};
  border-radius: ${styles.borderRadius};
  box-shadow: ${styles.shadow};
  ${props =>
    props.inline &&
    css`
      display: inline-flex;
      justify-content: space-between;
    `};
  &.compressed {
    width: 65%;
  }
`
Section.defaultProps = {
  color: 'white',
  borderRadius: 'square',
  shadow: 'none',
}

export const Card = styled.div`
  margin: ${props => (props.row ? '0 5% 0 0' : 0)};
  width: ${props => (props.row ? 100 : 48)}%;
  min-height: 250px;
  margin: 1% 0;
  padding: 2% 5%;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
`
