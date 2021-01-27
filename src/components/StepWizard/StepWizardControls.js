import React from "react";

import "./styles.css";
import Button from "../Button";

const StepWizardControls = ({ activeStep, stepsCount, previousStep }) => {
  const isLastStep = stepsCount === activeStep + 1;

  return (
    <div className="step-wizard__controls">
      <Button
        type="submit"
        className={`step-wizard__button ${
          isLastStep && "step-wizard__button-success"
        }`}
      >
        {isLastStep ? "Finish" : "Forward"}
      </Button>
      {!!activeStep && (
        <Button
          color="gray"
          className="step-wizard__button step-wizard__button-back"
          onClick={previousStep}
        >
          Back
        </Button>
      )}
    </div>
  );
};

export default StepWizardControls;
