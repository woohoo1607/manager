import React from "react";
import Button from "../Button";

const StepWizardHeader = ({ steps, activeStep }) => {
  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {steps.map((item, i) => {
            let isDisabled = false;
            let className;
            if (activeStep === i) {
              className = "current";
            } else if (activeStep < i) {
              isDisabled = true;
            } else {
              className = "primary";
            }
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button
                  className={"step-wizard-menu__button " + className}
                  disabled={isDisabled}
                >
                  {i + 1 + ". " + item}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default StepWizardHeader;
