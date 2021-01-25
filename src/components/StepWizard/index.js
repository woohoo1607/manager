import React from "react";

import AccountForm from "./AccountForm";
import StepWizardHeader from "./StepWizardHeader";
import ProfileForm from "./ProfileForm";
import "./styles.css";

const StepWizard = ({ nextStep, user, steps, activeStep, previousStep }) => {
  const { username, password, avatar } = user;
  return (
    <div className="step-wizard">
      <StepWizardHeader steps={steps} activeStep={activeStep} />
      {activeStep === 0 && (
        <AccountForm
          nextStep={nextStep}
          username={username}
          password={password}
          avatar={avatar}
        />
      )}
      {activeStep === 1 && (
        <ProfileForm
          nextStep={nextStep}
          {...user}
          previousStep={previousStep}
        />
      )}
    </div>
  );
};

export default StepWizard;
