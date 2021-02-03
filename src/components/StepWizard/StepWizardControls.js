import React from "react";

import "./styles.css";
import Button from "../Button";

const StepWizardControls = ({
  currentStep = 0,
  isLastStep = false,
  previousStep = () => {},
  isEditMode = false,
}) => {
  return (
    <div className="step-wizard__controls">
      {isEditMode ? (
        <Button className={`step-wizard__button`}>Save</Button>
      ) : isLastStep ? (
        <Button className={`step-wizard__button step-wizard__button-success`}>
          Finish
        </Button>
      ) : (
        <Button className={`step-wizard__button`}>Forward</Button>
      )}
      {!!currentStep && !isEditMode && (
        <Button
          type="button"
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
