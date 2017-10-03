import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { StyledTab, StyledTabList } from './styles'
import 'react-tabs/style/react-tabs.css'

class ReactTabs extends Component {
  renderTabTitles = () => {
    const title = this.props.titles.map(title => {
      return <Tab>{title}</Tab>
    })
    return title
  }
  renderTabContent = () => {
    const tabComponent = this.props.children.map(content => {
      return <TabPanel>{content}</TabPanel>
    })
    return tabComponent
  }
  render() {
    const tabTitles = this.renderTabTitles()
    const tabComponents = this.renderTabContent()
    return (
      <Tabs>
        <StyledTabList>{tabTitles}</StyledTabList>
        {tabComponents}
      </Tabs>
    )
  }
}
export default ReactTabs
