import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StepWizard from "../../components/StepWizard";
import { addAccountData } from "./actions";

const StepWizardContainer = ({ steps }) => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const user = useSelector((state) => state.user);

  const addData = useCallback(
    (data) => {
      dispatch(addAccountData({ ...data }));
    },
    [dispatch]
  );

  const nextStep = (data) => {
    addData(data);
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <StepWizard
      nextStep={nextStep}
      user={user}
      steps={steps}
      activeStep={activeStep}
      previousStep={previousStep}
    />
  );
};

export default StepWizardContainer;
