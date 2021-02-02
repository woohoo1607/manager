import React from "react";

import "./styles.css";
import Button from "../Button";

const StepWizardControls = ({
  activeStep = 0,
  isLastStep = false,
  previousStep = () => {},
  isEditMode = false,
}) => {
  return (
    <div className="step-wizard__controls">
      {isEditMode ? (
        <Button type="submit" className={`step-wizard__button`}>
          Save
        </Button>
      ) : (
        <Button
          type="submit"
          className={`step-wizard__button ${
            isLastStep && "step-wizard__button-success"
          }`}
        >
          {isLastStep ? "Finish" : "Forward"}
        </Button>
      )}
      {!!activeStep && !isEditMode && (
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
