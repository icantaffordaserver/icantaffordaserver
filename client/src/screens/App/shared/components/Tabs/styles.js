import styled, { css } from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const StyledTabs = styled(Tabs)`
  &:before {
    justify-content: center;
  }
`

export const StyledCardTab = styled(Tab)`
  width: 32%;
  padding: 1%;
  text-align: center;
`
StyledCardTab.tabsRole = 'Tab'

export const StyledCardTabPanel = styled(TabPanel)`
padding-top: 1%;
background: #fff;
min-width: 323px;
display: -webkit-flex;
display: flex;
-webkit-flex-direction: column /* works with row or column */
flex-direction: column;
-webkit-align-items: center;
align-items: center;
-webkit-justify-content: center;
justify-content: center;
`
StyledCardTabPanel.tabsRole = 'TabPanel'

export const StyledTabList = styled(TabList)`
  border: none;
  position: fixed;
  top: 0;
  width: 98%;
  display: flex;
  justify-content: space-around;
  background: #7781c8;
  z-index: 1;
  font-size: 1.5em;
  padding: 10px 30px;
  ${props =>
    props.active ? css`background: #fff;` : css`background: ${props.color};`};
`
export const StyledTabListRelative = styled(TabList)`
  border: none;
  position: relative;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #e0e0e0;
  padding: 10px 0px;
  ${props =>
    props.active ? css`background: #fff;` : css`background: ${props.color};`};
`
