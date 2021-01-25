import React from "react";
import { Switch, Route } from "react-router-dom";

import NewUserPage from "../pages/NewUserPage";
import TemplatePage from "../pages/TemplatePage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <TemplatePage {...props} />} />
      <Route
        exact
        path="/users"
        render={(props) => <TemplatePage {...props} />}
      />
      <Route path="/users/new" render={(props) => <NewUserPage {...props} />} />
      <Route
        exact
        path="/users/:id"
        render={(props) => <TemplatePage {...props} />}
      />
      <Route
        path="/users/:id/edit"
        render={(props) => <TemplatePage {...props} />}
      />
    </Switch>
  );
};

export default Routes;
