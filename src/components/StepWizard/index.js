import React, { useState } from "react";
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
  changeUrl = () => {},
  basePath = "",
}) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const currentSlug = pathname.split(`${basePath}/`)[1] || steps[0].slug;

  const specialStepsData = steps.map(({ slug, title }, i, array) => {
    const isLastStep = i + 1 === array.length;
    const currentStepIndex = array.findIndex(
      ({ slug }) => slug === currentSlug
    )[0];
    const data = { title, slug, isLastStep, isDisabled: true, isActive: false };
    if (slug === currentSlug) {
      return { ...data, isActive: true, isDisabled: false };
    } else if (isEditMode || i < currentStepIndex) {
      return { ...data, isDisabled: false };
    } else {
      return data;
    }
  });
  console.log(specialStepsData);
  const changeStep = (slug) => {
    push(`${basePath}/${slug}`);
  };

  /*  const isLastStep = steps.length === getNextStepIndex();*/

  const nextStep = (data) => {
    saveStep(data);
    const index = specialStepsData.findIndex(
      ({ slug }) => slug === currentSlug
    );
    specialStepsData[index].isActive = false;
    specialStepsData[index].isDisabled = false;
    changeStep(specialStepsData[index + 1].slug);
  };

  /*  const submitForm = isLastStep || isEditMode ? submit : nextStep;*/
  const submitForm = isEditMode ? submit : nextStep;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={specialStepsData}
        goToStep={changeStep}
        isEditMode={isEditMode}
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
                  /*       currentStep={currentStep}*/
                  /*isLastStep={isLastStep}*/
                  /*     previousStep={previousStep}*/
                  isEditMode={isEditMode}
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
