import styled, { css } from 'styled-components'

export const TabMenu = styled.ul`
  position: absolute;
  right: 20px;
  top: -39.5px;
  display: flex;
  justify-content: space-between;
`

export const Tab = styled.button`
  border: none;
  font-size: 1.5em;
  padding: 10px 30px;
  ${props =>
    props.active ? css`background: #fff;` : css`background: ${props.color};`};
`
