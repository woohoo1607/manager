import React, { useState } from "react";

import StepWizardHeader from "./StepWizardHeader";

import "./styles.css";
import StepWizardControls from "./StepWizardControls";

const StepWizard = ({ data, steps, saveStep }) => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsCnt = steps.length;

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
        <CurrentFrom {...data} nextStep={nextStep}>
          <StepWizardControls
            activeStep={activeStep}
            stepsCnt={stepsCnt}
            previousStep={previousStep}
            nextStep={nextStep}
          />
        </CurrentFrom>
      </div>
    </div>
  );
};

export default StepWizard;
