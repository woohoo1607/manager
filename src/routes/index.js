import React from "react";
import { Switch, Route } from "react-router-dom";

import NewUserPage from "../pages/user/NewUserPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/user/UserPage";
import EditUserPage from "../pages/user/EditUserPage";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <HomePage {...props} />} />
      <Route path="/users/new" render={(props) => <NewUserPage {...props} />} />
      <Route
        exact
        path="/users/:id"
        render={(props) => <UserPage {...props} />}
      />
      <Route
        path="/users/:id/edit"
        render={(props) => <EditUserPage {...props} />}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
