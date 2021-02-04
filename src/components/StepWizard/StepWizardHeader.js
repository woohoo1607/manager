import React from "react";
import Button from "../Button";

import "./styles.css";

const StepWizardHeader = ({
  steps = [],
  currentStep = 0,
  goToStep = () => {},
  isEditMode = false,
  allowedTabs = [],
}) => {
  const changeStep = (slug) => () => {
    goToStep(slug);
  };

  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {steps.map(({ title, isLastStep, slug, isDisabled, isActive }, i) => {
            let className;
            if (isActive) {
              className = "current";
            } else {
              className = "primary";
            }
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button
                  className={"step-wizard-menu__button " + className}
                  disabled={isDisabled}
                  onClick={changeStep(slug)}
                >
                  {i + 1 + ". " + title}
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
