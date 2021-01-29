import React, { useState } from "react";

import StepWizardHeader from "./StepWizardHeader";

import "./styles.css";
import StepWizardControls from "./StepWizardControls";

const StepWizard = ({
  data = [],
  steps = [],
  saveStep = () => {},
  submit = () => {},
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = steps.length === activeStep + 1;

  const nextStep = (data) => {
    saveStep(data);
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  const CurrentFrom = steps.filter((step, i) => i === activeStep)[0].component;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps}
        activeStep={activeStep}
        goToStep={setActiveStep}
      />
      <div className="step-wizard-body">
        <CurrentFrom {...data} submit={isLastStep ? submit : nextStep}>
          <StepWizardControls
            activeStep={activeStep}
            isLastStep={isLastStep}
            previousStep={previousStep}
          />
        </CurrentFrom>
      </div>
    </div>
  );
};

export default StepWizard;
