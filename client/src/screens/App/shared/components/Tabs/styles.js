import styled, { css } from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const StyledCardTab = styled(Tab)`
  width: 32%;
  padding: 3%;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: 0px 2px 0px orange;
  }
`
StyledCardTab.tabsRole = 'Tab'

export const StyledTab = styled(Tab)`
  color: #f2f2f2;
  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: 0px 2px 0px orange;
  }
`
StyledTab.tabsRole = 'Tab'

export const StyledCardTabPanel = styled(TabPanel)`
padding-top: 1%;
background: #fff;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #7781c8;
  z-index: 1;
  font-size: 1.5em;
  overflow: overlay;
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
  padding: 0px 0px;
  ${props =>
    props.active ? css`background: #fff;` : css`background: ${props.color};`};
`
