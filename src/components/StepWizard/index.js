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
  currentTab = 0,
  changeUrl = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState(currentTab);
  const [allowedTabs, setAllowedTabs] = useState([0]);

  const getNextStepIndex = () => {
    return currentStep + 1;
  };
  const getPreviousStepIndex = () => {
    return currentStep - 1;
  };

  const getTabUrlName = (i) => steps[i].urlName;

  const isLastStep = steps.length === getNextStepIndex();

  const nextStep = (data) => {
    const stepIndex = getNextStepIndex();
    saveStep(data);
    setCurrentStep(stepIndex);
    if (!allowedTabs.includes(stepIndex)) {
      setAllowedTabs([...allowedTabs, stepIndex]);
    }
    changeUrl(getTabUrlName(stepIndex));
  };

  const previousStep = () => {
    const stepIndex = getPreviousStepIndex();
    setCurrentStep(stepIndex);
    changeUrl(getTabUrlName(stepIndex));
  };

  const CurrentFrom = steps.filter((step, i) => i === currentStep)[0].component;

  const submitForm = isLastStep || isEditMode ? submit : nextStep;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps}
        currentStep={currentStep}
        goToStep={setCurrentStep}
        isEditMode={isEditMode}
        changeUrl={changeUrl}
        getTabUrlName={getTabUrlName}
        allowedTabs={allowedTabs}
      />
      <div className="step-wizard-body">
        <CurrentFrom {...data} submit={submitForm}>
          <StepWizardControls
            currentStep={currentStep}
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
