import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { bind } from 'styled-props'
import Theme from '../Theme'

const styles = bind(Theme)

const getColor = (color, key) => {
  return color ? color : styles.key
}

export const Title = styled.h1`
  color: ${styles.color};
  font-weight: bold;
  margin: 2% auto !important;
  text-align: ${props =>
    props.left ? 'left' : props.right ? 'right' : 'center'};
  width: ${props => (props.fullWidth ? 100 : styles.size)}%;
  font-size: ${styles.fontSize}em;
`
Title.defaultProps = {
  color: 'accent',
  fontSize: 'medium',
  size: 'medium',
}

export const Subheading = styled.h4`
  color: ${styles.color};
  font-weight: 300;
  margin: 0 auto;
  text-align: ${props =>
    props.left ? 'left' : props.right ? 'right' : 'center'};
  width: ${props => (props.fullWidth ? 100 : styles.size)}%;
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
export const TextLink = styled(Link)`
  transition: all 0.15s ease;
  color: ${styles.color};
  font-size: ${styles.fontSize}em;
  text-decoration: none;
  text-align: ${props =>
    props.left ? 'left' : props.right ? 'right' : 'center'};

  &:hover {
    cursor: pointer;
  }
`
TextLink.defaultProps = {
  color: 'primary',
  fontSize: 'small',
}

export const Text = styled.p`
  color: ${styles.color};
  width: 100%;
  margin: 0;
  font-size: ${styles.fontSize}em;
  text-align: ${props =>
    props.left ? 'left' : props.right ? 'right' : 'center'};
`
Text.defaultProps = {
  color: 'darkGray',
  fontSize: 'small',
}

export const ButtonText = styled.p`
  font-family: Lato
  font-style: bold
  font-size: 20px
  line-height: 24px
  text-align: center
`
