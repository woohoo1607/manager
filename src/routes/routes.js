import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../components/Header/Header";

const Routes = () => {
  return (
    <Switch>
      <Header />
      <Route exact path="/" render={(props) => <div {...props} />} />
      <Route exact path="/users" render={(props) => <div {...props} />} />
      <Route exact path="/users/:id" render={(props) => <div {...props} />} />
      <Route path="/users/new" render={(props) => <div {...props} />} />
      <Route path="/users/:id/edit" render={(props) => <div {...props} />} />
    </Switch>
  );
};

export default Routes;
