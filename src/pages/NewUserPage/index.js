import React from "react";

import TemplatePage from "../TemplatePage";
import UserFormContainer from "../../containers/UserFormContainer";

const NewUserPage = () => {
  const title = "Adding new user";
  return (
    <TemplatePage title={title}>
      <UserFormContainer />
    </TemplatePage>
  );
};

export default NewUserPage;
