import React, { useEffect } from "react";
import { useHistory, Route, useRouteMatch, useParams } from "react-router-dom";

import StepWizardHeader from "./StepWizardHeader";
import StepWizardControls from "./StepWizardControls";

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
}) => {
  const { slug } = useParams();
  const { push } = useHistory();
  const { allowedUnsubmittedStep } = data;
  const firstStepSlug = steps[0].slug;

  useEffect(() => {
    if (!slug) {
      if (slug !== firstStepSlug && !isEditMode)
        push(`${path}/${firstStepSlug}`);
    }
  }, [path, push, firstStepSlug, isEditMode, slug]);

  const currentStepIndex = steps.findIndex(
    ({ slug: foundSlug }) => foundSlug === slug
  );

  const changeStep = (slug) => {
    push(`${path}/${slug}`);
  };

  const isLastStep = currentStepIndex === steps.length - 1;

  const isFirstStep = firstStepSlug === slug;

  const nextStep = (data) => {
    saveStep({
      ...data,
      allowedUnsubmittedStep:
        currentStepIndex === allowedUnsubmittedStep
          ? currentStepIndex + 1
          : allowedUnsubmittedStep,
    });
    changeStep(steps[currentStepIndex + 1].slug);
  };

  const previousStep = () => changeStep(steps[currentStepIndex - 1].slug);

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
