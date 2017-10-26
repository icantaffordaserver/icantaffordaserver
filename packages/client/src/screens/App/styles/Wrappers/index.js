import styled, { css } from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

const styles = bind(Theme)

export const Background = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100% !important;
  background: ${styles.color};
  overflow: scroll;
  overflow-x: hidden;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
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
  border-radius: ${styles.borderRadius}
  box-shadow: ${styles.shadow}
  ${props =>
    props.inline &&
    css`
      display: inline-flex;
      justify-content: space-between;
    `}
`
Section.defaultProps = {
  color: 'white',
  borderRadius: 'square',
  shadow: 'none',
}
