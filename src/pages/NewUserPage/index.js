import React from "react";

import TemplatePage from "../TemplatePage";
import StepWizardContainer from "../../containers/StepWizardContainer";

const steps = [
  { title: "Account", type: "active" },
  { title: "Profile", type: "disabled" },
  { title: "Contacts", type: "disabled" },
  { title: "Capabilities", type: "disabled" },
];

const NewUserPage = () => {
  return (
    <TemplatePage title="Adding new user">
      <StepWizardContainer steps={steps} />
    </TemplatePage>
  );
};

export default NewUserPage;
