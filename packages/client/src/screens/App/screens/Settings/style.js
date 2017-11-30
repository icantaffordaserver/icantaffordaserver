import styled from 'styled-components'

export const DeleteButton = styled.button`
  transition: all 0.25s ease !important;
  padding: 2% !important;
  width: 100%;
  height: 60px;
  background: ${props => props.color};
  border: solid 1px ${props => props.color};
  border-radius: none;
  font-size: 14px;
  color: ${props => props.inverseColor};
  &:hover {
    color: ${props => (props.noHoverChange ? props.inverseColor : props.color)};
    border: solid 1px
      ${props => (props.noHoverChange ? props.inverseColor : props.color)};
    background: ${props =>
      props.noHoverChange ? props.color : props.inverseColor};
  }
`
