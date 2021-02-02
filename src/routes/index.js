import React from "react";
import { Switch, Route } from "react-router-dom";

import NewUserPage from "../pages/NewUserPage";
import TemplatePage from "../pages/TemplatePage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import EditUserPage from "../pages/EditUserPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <HomePage {...props} />} />
      <Route
        exact
        path="/users"
        render={(props) => <TemplatePage {...props} />}
      />
      <Route path="/users/new" render={(props) => <NewUserPage {...props} />} />
      <Route
        exact
        path="/users/:id"
        render={(props) => <UserPage {...props} />}
      />
      <Route
        path="/users/:id/edit/"
        render={(props) => <EditUserPage {...props} />}
      />
    </Switch>
  );
};

export default Routes;
