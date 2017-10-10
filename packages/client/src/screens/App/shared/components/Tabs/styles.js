import styled, { css } from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const StyledTab = styled(Tabs)`border-bottom: solid;`

export const StyledTabList = styled(TabList)`
  border: none;
  position: fixed;
  top: 0;
  width: 98%;
  display: flex;
  justify-content: space-around;
  background: #ddd;
  font-size: 1.5em;
  padding: 10px 30px;
  ${props =>
    props.active ? css`background: #fff;` : css`background: ${props.color};`};
`
