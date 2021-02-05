import React from "react";

import "./styles.css";
import Button from "../UI/Button";

const StepWizardControls = ({
  isFirstStep = true,
  isLastStep = false,
  previousStep = () => {},
  isEditMode = false,
}) => {
  const submitButton = ({ title, className }) => (
    <Button className={`step-wizard__button ${className ? className : ""}`}>
      {title}
    </Button>
  );
  const backButton = (
    <Button
      type="button"
      color="gray"
      className="step-wizard__button step-wizard__button-back"
      onClick={previousStep}
    >
      Back
    </Button>
  );
  const controls = [];

  if (isEditMode) {
    controls.push(submitButton({ title: "Save" }));
  } else {
    isLastStep
      ? controls.push(
          submitButton({
            title: "Finish",
            className: "step-wizard__button-success",
          })
        )
      : controls.push(submitButton({ title: "Forward" }));
    if (!isFirstStep) {
      controls.push(backButton);
    }
  }
  return <div className="step-wizard__controls">{controls}</div>;
};

export default StepWizardControls;
