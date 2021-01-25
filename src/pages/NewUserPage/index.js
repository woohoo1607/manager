import React from "react";

import TemplatePage from "../TemplatePage";
import StepWizardContainer from "../../containers/StepWizardContainer";

const steps = ["Account", "Profile", "Contacts", "Capabilities"];

const NewUserPage = () => {
  return (
    <TemplatePage title="Adding new user">
      <StepWizardContainer steps={steps} />
    </TemplatePage>
  );
};

export default NewUserPage;
