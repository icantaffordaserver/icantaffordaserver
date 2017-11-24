import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import FaUserPlus from 'react-icons/lib/fa/user-plus'
import FaGroup from 'react-icons/lib/fa/group'
import FaCal from 'react-icons/lib/fa/calendar'
import FaPencil from 'react-icons/lib/fa/pencil-square'

import ProfileHeader from './SideNavProfileHeader'

class SideNav extends Component {
  render() {
    return (
      <AppWrapper>
        <TopBarHeader />
        <AppView>
          <SideNavWrapper>
            <ProfileHeader />
            <MenuContainer>
              <MenuItem to="/invites">
                <FaUserPlus size={24} />
                <MenuText>Invites</MenuText>
                <Notification>8</Notification>
              </MenuItem>
              <MenuItem to="/queue">
                <FaGroup size={24} />
                <MenuText>Queue</MenuText>
                <Notification>8</Notification>
              </MenuItem>
              <MenuItem to="/upcoming">
                <FaCal size={24} />
                <MenuText>Upcoming</MenuText>
                <Notification>8</Notification>
              </MenuItem>
              <MenuItem to="/feedback">
                <FaPencil size={24} />
                <MenuText>Feedback</MenuText>
                <Notification>8</Notification>
              </MenuItem>
            </MenuContainer>
          </SideNavWrapper>
          {this.props.children}
        </AppView>
      </AppWrapper>
    )
  }
}

export default SideNav

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

const AppView = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`

const TopBarHeader = styled.div`
  width: 100%;
  height: 56px;
  background: black;
`

const SideNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 256px;
  background-color: #f6f7f8;
  border-right: 1px solid #e0e7ee;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  margin-top: 50px;
`

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 12px 16px;
  padding: 5px 5px;
  border: 1px solid transparent;
  color: #88898b;
  text-decoration: none;
  &:hover {
    border: 1px solid #e0e7ee;
    border-radius: 5px;
    cursor: pointer;
  }
  // note here for RR, an 'active class is added when elem is selected'
  &.active {
    border: 1px solid #e0e7ee;
    border-radius: 5px;
    color: black;
  }
`

const MenuText = styled.div`
  margin-left: 8px;
`

const Notification = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border: 2px solid red;
  border-radius: 50%;
  color: white;
  background: red;
  font-weight: bold;
`
