import React from "react";

import AccountForm from "./AccountForm";
import StepWizardHeader from "./StepWizardHeader";
import ProfileForm from "./ProfileForm";
import "./styles.css";

const StepWizard = ({ nextStep, user, steps, activeStep, previousStep }) => {
  const { username, password, avatar } = user;
  const stepForms = [
    <AccountForm
      nextStep={nextStep}
      username={username}
      password={password}
      avatar={avatar}
    />,
    <ProfileForm nextStep={nextStep} {...user} previousStep={previousStep} />,
  ];
  return (
    <div className="step-wizard">
      <StepWizardHeader steps={steps} activeStep={activeStep} />
      {stepForms.filter((step, i) => i === activeStep)[0]}
    </div>
  );
};

export default StepWizard;
