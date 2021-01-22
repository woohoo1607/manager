import React from "react";

import AccountForm from "./AccountForm";
import StepWizardHeader from "./StepWizardHeader";
import "./styles.css";

const list = [
  { title: "Account", type: "active" },
  { title: "Profile", type: "disabled" },
  { title: "Contacts", type: "disabled" },
  { title: "Capabilities", type: "disabled" },
];

const StepWizard = ({ addData, user }) => {
  const { username, password, avatar } = user;
  return (
    <div className="step-wizard">
      <StepWizardHeader list={list} />
      <AccountForm
        addData={addData}
        username={username}
        password={password}
        avatar={avatar}
      />
    </div>
  );
};

export default StepWizard;
