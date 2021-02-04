import React from "react";
import Button from "../Button";

import "./styles.css";

const StepWizardHeader = ({
  steps = [],
  currentSlug,
  goToStep = () => {},
  allowedSteps = [],
}) => {
  const handleClick = (slug) => () => goToStep(slug);

  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {steps.map(({ title, slug }, i) => {
            let className;
            const isDisabled = !allowedSteps.includes(slug);
            if (slug === currentSlug) {
              className = "current";
            } else {
              className = "primary";
            }
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button
                  className={"step-wizard-menu__button " + className}
                  disabled={isDisabled}
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
