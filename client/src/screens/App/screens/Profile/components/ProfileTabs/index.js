import React from 'react'

import { Tab, TabMenu } from './style'

export default props => {
  return (
    <TabMenu>
      <li>
        <Tab
          active={props.active === 'about'}
          onClick={e => props.changeTab(e, 'about')}
        >
          About
        </Tab>
      </li>
      <li>
        <Tab
          active={props.active === 'availability'}
          onClick={e => props.changeTab(e, 'availability')}
        >
          Availability
        </Tab>
      </li>
      <li>
        <Tab
          active={props.active === 'settings'}
          onClick={e => props.changeTab(e, 'settings')}
        >
          Settings
        </Tab>
      </li>
    </TabMenu>
  )
}
