import styled from 'styled-components'
import { bind } from 'styled-props'
import Theme from '../Theme'

const styles = bind(Theme)

export const Title = styled.h1`
  color: ${styles.color};
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  width: ${styles.size}%;
  font-size: ${styles.fontSize}em;
`
Title.defaultProps = {
  color: 'accent',
  fontSize: 'medium',
  size: 'medium',
}

export const Subheading = styled.h4`
  color: ${styles.color}
  font-weight: 300;
  margin: 0 auto;
  text-align: center;
  width: ${styles.size}%;
  font-size: ${styles.fontSize}em;
`
Subheading.defaultProps = {
  color: 'white',
  fontSize: 'small',
  size: 'small',
}
export const Label = styled.label`
  flex: none;
  font-weight: bold;
  font-size: 1.75em;
  min-width: 10%;
  margin-top: 5%;
  margin-bottom: 10px;
  color: ${styles.color};
`
Label.defaultProps = {
  color: 'accent',
}
