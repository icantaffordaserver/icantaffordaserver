import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import WithSideNav from "./components/SideNav";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <WithSideNav>
          <Route path="/" component={Home} />
        </WithSideNav>
      </BrowserRouter>
    );
  }
}

export default App;
