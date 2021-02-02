import React from "react";
import Button from "../Button";

import "./styles.css";

const StepWizardHeader = ({
  steps = [],
  activeStep = 0,
  goToStep = () => {},
  isEditMode = false,
  changeUrl = () => {},
  findTitleTab = () => {},
  allowedTabs = [],
}) => {
  const changeStep = (i) => () => {
    goToStep(i);
    changeUrl(findTitleTab(i));
  };

  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {steps.map(({ title }, i) => {
            let isDisabled = false;
            let className;
            if (activeStep === i) {
              className = "current";
            } else if (!isEditMode && !allowedTabs.includes(i)) {
              isDisabled = true;
            } else {
              className = "primary";
            }
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button
                  className={"step-wizard-menu__button " + className}
                  disabled={isDisabled}
                  onClick={changeStep(i)}
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
