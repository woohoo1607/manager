import React from "react";

import "./styles.css";
import Button from "../UI/Button";

const StepWizardControls = ({
  isFirstStep = true,
  isLastStep = false,
  previousStep = () => {},
  isEditMode = false,
}) => {
  let submitButtonTitle = "";
  let isShowBackButton = false;
  let isSuccessSubmit = false;
  if (isEditMode) {
    submitButtonTitle = "Save";
  } else {
    submitButtonTitle = isLastStep ? "Finish" : "Forward";
    isShowBackButton = !isFirstStep;
    isSuccessSubmit = isLastStep;
  }
  return (
    <div className="step-wizard__controls">
      <Button
        className={`step-wizard__button ${
          isSuccessSubmit ? "step-wizard__button-success" : ""
        }`}
      >
        {submitButtonTitle}
      </Button>
      {isShowBackButton && (
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
