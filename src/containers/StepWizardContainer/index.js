import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import StepWizard from "../../components/StepWizard";
import { addAccountData } from "./actions";

const StepWizardContainer = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const addData = useCallback((data) => dispatch(addAccountData({ ...data })), [
    dispatch,
  ]);

  return <StepWizard addData={addData} user={user} />;
};

export default StepWizardContainer;
