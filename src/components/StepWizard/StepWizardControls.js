import React from "react";

import "./styles.css";
import Button from "../UI/Button";

const ControlButton = ({
  title = "",
  className,
  children = "Save",
  ...props
}) => (
  <Button
    className={`step-wizard__button ${className ? className : ""}`}
    {...props}
  >
    {children || title}
  </Button>
);

const Wrapper = ({ children }) => (
  <div className="step-wizard__controls">{children}</div>
);

const StepWizardControls = ({
  isFirstStep = true,
  isLastStep = false,
  previousStep = () => {},
  isEditMode = false,
}) => {
  if (isEditMode) {
    return (
      <Wrapper>
        <ControlButton />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {isLastStep ? (
          <ControlButton
            className="step-wizard__button-success"
            title="Finish"
          />
        ) : (
          <ControlButton title="Forward" />
        )}
        {!isFirstStep && (
          <ControlButton
            type="button"
            className="step-wizard__button-back"
            onClick={previousStep}
            title="Back"
          />
        )}
      </Wrapper>
    );
  }
};

export default StepWizardControls;
