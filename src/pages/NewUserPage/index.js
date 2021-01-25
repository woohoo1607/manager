import React from "react";

import TemplatePage from "../TemplatePage";
import StepWizardContainer from "../../containers/StepWizardContainer";

const NewUserPage = () => {
  return (
    <TemplatePage title="Adding new user">
      <StepWizardContainer />
    </TemplatePage>
  );
};

export default NewUserPage;
