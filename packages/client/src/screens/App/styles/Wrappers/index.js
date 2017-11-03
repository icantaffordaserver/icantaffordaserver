import styled, { css } from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

import { Card as card } from 'semantic-ui-react'

const styles = bind(Theme)

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: ${styles.color};
  overflow-y: scroll;
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
  margin: 10% auto;
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
  justify-content: space-between;
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
  align-items: center;
`

export const Section = styled.section`
  width: 100%;
  padding: 2% 5%;
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
  width: ${props => (props.row ? 100 : 90)}%;
  min-height: 200px;
  height: max-content;
  padding: 2% 5%;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.row ? 'space-evenly' : 'center')};
  flex-direction: ${props => (props.row ? 'row' : 'column')};

  &.pushed {
    margin-top: 3.35em;
  }
`
