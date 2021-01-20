import React from "react";
import { Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <div />} />
      <Route exact path="/add-user" render={(props) => <div {...props} />} />
      <Route exact path="/edit-user/:" render={(props) => <div {...props} />} />
      <Route exact path="/user/:id" render={(props) => <div {...props} />} />
    </Switch>
  );
};

export default Routes;
