import React from "react";

const StepWizardBody = ({ handleSubmit, leftContent, rightContent }) => {
  return (
    <form className="user-form-body" onSubmit={handleSubmit}>
      <div className="step-wizard-left">{leftContent}</div>
      <div className="step-wizard-right">{rightContent}</div>
    </form>
  );
};

export default StepWizardBody;
