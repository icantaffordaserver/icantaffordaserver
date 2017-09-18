import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, withRouter } from "react-router-dom";
import { graphql, compose, withApollo } from "react-apollo";

import ProfileTabs from "./ProfileTabs";
import { Profile } from "../style";
import AboutComponent from "./AboutComponent";
import AvailabilityComponent from "./AvailabilityComponent";
import SettingsComponent from "./SettingsComponent";

import currentUserQuery from "../../../shared/graphql/queries/currentUserQuery";

class ProfileComponent extends Component {
  state = {
    currentTab: "about",
    loading: false,
    error: ""
  };

  changeTab(e, tab, context) {
    e.preventDefault();
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <Profile>
        <ProfileTabs changeTab={this.changeTab.bind(this)} />
        {this.state.currentTab === "about" ? (
          <AboutComponent user={this.props.user} />
        ) : this.state.currentTab === "availability" ? (
          <AvailabilityComponent />
        ) : this.state.currentTab === "settings" ? (
          <SettingsComponent onSubmit={this.props.onSettingChange} />
        ) : null}
      </Profile>
    );
  }
}

export default compose(graphql(currentUserQuery), withApollo, withRouter)(
  ProfileComponent
);
