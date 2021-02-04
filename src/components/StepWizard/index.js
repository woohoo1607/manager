import React, { useState, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";

import "./styles.css";

const StepWizard = ({
  data = [],
  steps = [],
  saveStep = () => {},
  submit = () => {},
  isEditMode = false,
  basePath = "",
}) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const [currentSlug, setCurrentSlug] = useState(steps[0].slug);
  const [allowedSteps, setAllowedSteps] = useState([steps[0].slug]);

  useEffect(() => {
    const urlSlug = pathname.split(`${basePath}/`)[1];
    if (isEditMode && urlSlug) {
      setCurrentSlug(urlSlug);
    } else {
      push(`${basePath}/${steps[0].slug}`);
    }
  }, [basePath, push, steps, isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      const allStepsSlug = steps.map(({ slug }) => slug);
      setAllowedSteps(allStepsSlug);
    }
  }, [isEditMode, steps]);

  const currentStepIndex = steps.findIndex(({ slug }) => slug === currentSlug);

  const changeStep = (slug) => {
    push(`${basePath}/${slug}`);
    setCurrentSlug(slug);
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  const nextStep = (data) => {
    saveStep(data);
    const nextStepSlug = steps[currentStepIndex + 1].slug;
    changeStep(nextStepSlug);
    setAllowedSteps([...allowedSteps, nextStepSlug]);
  };

  const previousStep = () => changeStep(steps[currentStepIndex - 1].slug);

  const isFirstStep = steps[0].slug === currentSlug;

  const submitForm = isLastStep || isEditMode ? submit : nextStep;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps}
        goToStep={changeStep}
        allowedSteps={allowedSteps}
        currentSlug={currentSlug}
      />
      <div className="step-wizard-body">
        {steps.map(({ component: Step, slug }, i) => (
          <Route
            key={i}
            exact
            path={`${basePath}/${slug}`}
            render={(props) => (
              <Step {...data} submit={submitForm} {...props}>
                <StepWizardControls
                  isFirstStep={isFirstStep}
                  previousStep={previousStep}
                  isEditMode={isEditMode}
                  isLastStep={isLastStep}
                />
              </Step>
            )}
          />
        ))}
        {/*        <CurrentFrom {...data} submit={submitForm}>
          <StepWizardControls
            currentStep={currentStep}
            isLastStep={isLastStep}
            previousStep={previousStep}
            isEditMode={isEditMode}
          />
        </CurrentFrom>*/}
      </div>
    </div>
  );
};

export default StepWizard;
