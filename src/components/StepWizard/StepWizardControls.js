import React from "react";

import Button from "../UI/Button";
import "./styles.css";

const ControlButton = ({
  title = "Save",
  variant = "primary",
  children,
  ...props
}) => (
  <Button
    className={`step-wizard__button 
    ${variant === "success" ? "step-wizard__button-success" : ""} 
    ${variant === "light" ? "step-wizard__button-back" : ""}`}
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
          <ControlButton variant="success" title="Finish" />
        ) : (
          <ControlButton title="Forward" />
        )}
        {!isFirstStep && (
          <ControlButton
            type="button"
            variant="light"
            onClick={previousStep}
            title="Back"
          />
        )}
      </Wrapper>
    );
  }
};

export default StepWizardControls;
