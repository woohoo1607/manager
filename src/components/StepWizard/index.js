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

const findStepIndex = (steps, slug) =>
  steps.findIndex(({ slug: foundSlug }) => foundSlug === slug);

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
  const { slug: urlSlug } = useParams();
  const { push } = useHistory();
  const firstStepSlug = steps[0].slug;
  const slug = data.slug ? data.slug : firstStepSlug;
  const slugIndex = findStepIndex(steps, slug);
  const currentStepIndex = findStepIndex(steps, urlSlug);

  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = firstStepSlug === urlSlug;

  useEffect(() => {
    if (!isEditMode) {
      if (currentStepIndex === -1 || currentStepIndex > slugIndex) {
        push(`${path}/${firstStepSlug}`);
      }
    }
  }, [path, push, firstStepSlug, isEditMode, currentStepIndex, slugIndex]);

  const changeStep = (slug = "") => {
    if (typeof slug === "string") {
      push(`${path}/${slug}`);
    }
  };

  const nextStep = (data) => {
    const { slug: nextSlug } = steps[currentStepIndex + 1] || {};
    saveStep({
      ...data,
      slug: urlSlug === slug ? nextSlug : slug,
      meta: { redirect: push, path: `${path}/${nextSlug}` },
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
          isAllowed: isEditMode || i <= slugIndex,
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
