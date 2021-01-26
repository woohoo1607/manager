import React, { useState } from "react";

import StepWizardHeader from "./StepWizardHeader";

import "./styles.css";

const StepWizard = ({ data, steps, saveStep }) => {
  const [activeStep, setActiveStep] = useState(0);

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
      <StepWizardHeader steps={steps} activeStep={activeStep} />
      <CurrentFrom
        {...data}
        nextStep={nextStep}
        previousStep={previousStep}
        className="step-wizard-body"
      />
    </div>
  );
};

export default StepWizard;
