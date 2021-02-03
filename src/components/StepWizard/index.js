import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";

import "./styles.css";

const StepWizard = ({
  data = [],
  steps = [],
  saveStep = () => {},
  submit = () => {},
  isEditMode = false,
  currentTabIndex = 0,
  changeUrl = () => {},
  url = "",
}) => {
  const history = useHistory();
  console.log(history);
  console.log(url);
  const [currentStep, setCurrentStep] = useState(currentTabIndex);
  const [allowedTabs, setAllowedTabs] = useState([0]);

  const getNextStepIndex = () => {
    return currentStep + 1;
  };
  const getPreviousStepIndex = () => {
    return currentStep - 1;
  };

  const changeStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    changeUrl(getTabSlug(stepIndex));
  };

  const getTabSlug = (i) => steps[i].slug;

  const isLastStep = steps.length === getNextStepIndex();

  const nextStep = (data) => {
    const stepIndex = getNextStepIndex();
    saveStep(data);
    if (!allowedTabs.includes(stepIndex)) {
      setAllowedTabs([...allowedTabs, stepIndex]);
    }
    changeStep(stepIndex);
  };

  const previousStep = () => changeStep(getPreviousStepIndex());

  const CurrentFrom = steps.filter((step, i) => i === currentStep)[0].component;

  const submitForm = isLastStep || isEditMode ? submit : nextStep;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps}
        currentStep={currentStep}
        goToStep={changeStep}
        isEditMode={isEditMode}
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
