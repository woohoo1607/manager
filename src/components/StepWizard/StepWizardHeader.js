import React from "react";
import Button from "../Button";

import "./styles.css";

const StepWizardHeader = ({ steps = [], goToStep = () => {} }) => {
  const handleClick = (slug) => () => goToStep(slug);

  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {steps.map(({ title, slug, isAllowed, isCurrentStep }, i) => {
            const className = isCurrentStep ? "current" : "primary";
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button
                  className={"step-wizard-menu__button " + className}
                  disabled={!isAllowed}
                  onClick={handleClick(slug)}
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
