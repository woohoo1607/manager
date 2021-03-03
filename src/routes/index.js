import React from "react";
import { Switch, Route } from "react-router-dom";

import NewUserPage from "../pages/User/NewUserPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/User/UserPage";
import EditUserPage from "../pages/User/EditUserPage";
import LoggerPage from "../pages/LoggerPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/users/new" component={NewUserPage} />
      <Route exact path="/users/:id" component={UserPage} />
      <Route path="/users/:id/edit" component={EditUserPage} />
      <Route path="/logger" component={LoggerPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
