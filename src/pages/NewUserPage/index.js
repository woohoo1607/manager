import React from "react";

import TemplatePage from "../TemplatePage";
import StepWizardContainer from "../../containers/StepWizardContainer";

const NewUserPage = () => {
  const title = "Adding new user";
  return (
    <TemplatePage title={title}>
      <StepWizardContainer />
    </TemplatePage>
  );
};

export default NewUserPage;
