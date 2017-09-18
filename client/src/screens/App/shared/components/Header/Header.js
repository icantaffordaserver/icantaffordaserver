/**
 * Created by alexandermann on 2017-04-12.
 */
import React from "react";
import PropTypes from "prop-types";

import { generateGravatarUrl } from "./helpers";
import {
  Logo,
  UserButton,
  Avatar,
  Feedback,
  SideNav,
  SideNavMenu,
  SideNavMenuItem,
  UserDetails
} from "./styles";

import ToktumiH1 from "../ToktumiH1";

class Header extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    profileImgSrc: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    homeUrl: PropTypes.string.isRequired,
    dashboardUrl: PropTypes.string.isRequired,
    accountUrl: PropTypes.string.isRequired,
    loginUrl: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired
  };
  static defaultProps = {
    email: null,
    profileImgSrc: ""
  };

  render() {
    const { firstName, lastName, isAdmin, navigateTo } = this.props;
    return (
      <SideNav>
        <Logo>
          <ToktumiH1>Toktumi</ToktumiH1>
        </Logo>

        <SideNavMenu>
          <SideNavMenuItem active={this.props.location.pathname === "/profile"}>
            Profile
          </SideNavMenuItem>

          <SideNavMenuItem active={this.props.location === "inbox"}>
            Inbox
          </SideNavMenuItem>

          <SideNavMenuItem active={this.props.location === "talk"}>
            Talk
          </SideNavMenuItem>
        </SideNavMenu>

        <UserDetails>
          <Avatar
            src={
              this.props.profileImgSrc || generateGravatarUrl("temp@temp.com")
            }
          />
          <h4>{firstName + " " + lastName}</h4>
          <p>50 minutes until your next talk.</p>

          <Feedback>Feedback</Feedback>
          <div>
            <UserButton>Help</UserButton>
            |
            <UserButton>Logout</UserButton>
          </div>
        </UserDetails>
      </SideNav>
    );
  }
}

export default Header;
