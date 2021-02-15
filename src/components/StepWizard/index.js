import React, { useEffect } from "react";
import { useHistory, Route, useRouteMatch, useParams } from "react-router-dom";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";
import StepWizardFrame from "./StepWizardFrame";

import "./styles.css";

const StepWizardWrapper = (props) => {
  const { url } = useRouteMatch();
  return (
    <Route
      path={[`${url}/:slug`, url]}
      render={(routeProps) => (
        <StepWizard {...props} {...routeProps} path={url} />
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
  isUnsavedData = false,
  removeUnsavedData = () => {},
  loadUnsavedData = () => {},
}) => {
  const { slug } = useParams();
  const { push } = useHistory();
  const { allowedUnsubmittedStep } = data;
  const firstStepSlug = steps[0].slug;

  useEffect(() => {
    if (!isEditMode) {
      const slugIndex = steps.findIndex(
        ({ slug: foundSlug }) => foundSlug === slug
      );
      if (slugIndex === -1 || slugIndex > allowedUnsubmittedStep) {
        push(`${path}/${firstStepSlug}`);
      }
    }
  }, [
    path,
    push,
    firstStepSlug,
    isEditMode,
    slug,
    steps,
    allowedUnsubmittedStep,
  ]);

  const currentStepIndex = steps.findIndex(
    ({ slug: foundSlug }) => foundSlug === slug
  );

  const changeStep = (slug = "") => {
    if (typeof slug === "string") {
      push(`${path}/${slug}`);
    }
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  const isFirstStep = firstStepSlug === slug;

  const nextStep = (data) => {
    const { slug } = steps[currentStepIndex + 1] || {};
    saveStep({
      ...data,
      allowedUnsubmittedStep:
        currentStepIndex === allowedUnsubmittedStep
          ? currentStepIndex + 1
          : allowedUnsubmittedStep,
      meta: { redirect: push, path: `${path}/${slug}` },
    });
  };

  const previousStep = () => {
    if (currentStepIndex) {
      const { slug } = steps[currentStepIndex - 1] || {};
      changeStep(slug);
    }
  };

  return (
    <div className="step-wizard">
      <StepWizardHeader
        steps={steps.map(({ title, slug }, i) => ({
          title,
          slug,
          isAllowed: isEditMode || i <= allowedUnsubmittedStep,
          isCurrentStep: i === currentStepIndex,
        }))}
        goToStep={changeStep}
      />
      <div className="step-wizard-body">
        {isUnsavedData && (
          <StepWizardFrame
            loadUnsavedData={loadUnsavedData}
            removeUnsavedData={removeUnsavedData}
          />
        )}
        {steps.map(({ component: Step, slug }, i) => (
          <Route
            key={i}
            exact
            path={`${path}/${slug}`}
            render={(props) => (
              <Step
                {...data}
                submit={isLastStep || isEditMode ? submit : nextStep}
                {...props}
              >
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
