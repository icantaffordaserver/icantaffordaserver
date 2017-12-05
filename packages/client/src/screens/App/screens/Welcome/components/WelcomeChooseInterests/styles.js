import styled from 'styled-components'

export const Logo = styled.div`
  color: '#ff7f50';
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  & > h1 {
    margin: auto;
  }
  & > img {
    width: 35px;
    height: 29px;
    flex: none;
  }
`
export const Button = styled.button`
  transition: all 0.25s ease !important;
  padding: 2% !important;
  width: 100%;
  height: 50px;
  background: ${props => props.color};
  border: solid 1px ${props => props.color};
  border-radius: 30px;
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
