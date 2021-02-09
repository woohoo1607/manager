import React from "react";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";

const StepWizardFrame = ({
  loadUnsavedData = () => {},
  removeUnsavedData = () => {},
}) => (
  <div className="step-wizard__frame">
    <p>
      You have an unsaved user data. Do you want to complete it?{" "}
      <Button onClick={loadUnsavedData} className="step-wizard__frame__button">
        Continue
      </Button>
    </p>
    <IconButton
      onClick={removeUnsavedData}
      icon="close"
      iconProps={{ stroke: "#FFFFFF" }}
    />
  </div>
);

export default StepWizardFrame;
