import React, { useState } from "react";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";

import "./styles.css";

const StepWizard = ({
  data = [],
  steps = [],
  saveStep = () => {},
  submit = () => {},
  isEditMode = false,
  activeTab = 0,
  changeUrl = () => {},
}) => {
  const [activeStep, setActiveStep] = useState(activeTab);
  const [allowedTabs, setAllowedTabs] = useState([0]);

  const findTitleTab = (i) => steps[i].title.toLowerCase();

  const addCompletedTab = (activeStep) => {
    if (!allowedTabs.includes(activeStep + 1)) {
      setAllowedTabs([...allowedTabs, activeStep + 1]);
    }
  };

  const isLastStep = steps.length === activeStep + 1;

  const nextStep = (data) => {
    saveStep(data);
    setActiveStep(activeStep + 1);
    changeUrl(findTitleTab(activeStep + 1));
    addCompletedTab(activeStep);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
    changeUrl(findTitleTab(activeStep - 1));
  };

  const CurrentFrom = steps.filter((step, i) => i === activeStep)[0].component;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps}
        activeStep={activeStep}
        goToStep={setActiveStep}
        isEditMode={isEditMode}
        changeUrl={changeUrl}
        findTitleTab={findTitleTab}
        allowedTabs={allowedTabs}
      />
      <div className="step-wizard-body">
        <CurrentFrom
          {...data}
          submit={isLastStep || isEditMode ? submit : nextStep}
        >
          <StepWizardControls
            activeStep={activeStep}
            isLastStep={isLastStep}
            previousStep={previousStep}
            isEditMode={isEditMode}
          />
        </CurrentFrom>
      </div>
    </div>
  );
};

export default StepWizard;
