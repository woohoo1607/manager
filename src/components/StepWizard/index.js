import React, { useState, useEffect } from "react";
import { useHistory, Route, useRouteMatch, useParams } from "react-router-dom";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";

import "./styles.css";

const StepWizardWrapper = (props) => {
  const match = useRouteMatch();
  return (
    <Route
      path={[`${match.url}/:slug`, match.url]}
      render={(routeProps) => (
        <StepWizard {...props} {...routeProps} path={match.url} />
      )}
    />
  );
};

const StepWizard = ({
  data = {},
  steps = [],
  saveStep = () => {},
  submit = () => {},
  isEditMode = false,
  path = "",
}) => {
  const { slug } = useParams();
  const { push } = useHistory();
  const { allowedUnsubmittedStep } = data;

  useEffect(() => {
    if (!slug) {
      if (slug !== steps[0].slug && !isEditMode)
        push(`${path}/${steps[0].slug}`);
    }
  }, [path, push, steps, isEditMode, slug]);

  const currentStepIndex = steps.findIndex((step) => step.slug === slug);

  const allowedUnsubmittedStepIndex = steps.findIndex(
    ({ slug }) => slug === allowedUnsubmittedStep
  );

  const changeStep = (slug) => {
    push(`${path}/${slug}`);
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  const isFirstStep = steps[0].slug === slug;

  const nextStep = (data) => {
    const nextStepSlug = steps[currentStepIndex + 1].slug;
    saveStep({ ...data, allowedUnsubmittedStep: nextStepSlug });
    changeStep(nextStepSlug);
  };

  const previousStep = () => changeStep(steps[currentStepIndex - 1].slug);

  const submitForm = isLastStep || isEditMode ? submit : nextStep;

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps.map(({ title, slug }, i) => ({
          title,
          slug,
          isAllowed:
            isEditMode ||
            i <= currentStepIndex ||
            i <= allowedUnsubmittedStepIndex ||
            slug === allowedUnsubmittedStep,
          isCurrentStep: i === currentStepIndex,
        }))}
        goToStep={changeStep}
      />
      <div className="step-wizard-body">
        {steps.map(({ component: Step, slug }, i) => (
          <Route
            key={i}
            exact
            path={`${path}/${slug}`}
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
      </div>
    </div>
  );
};

export default StepWizardWrapper;
