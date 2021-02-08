import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import UserStepWizard from "../../components/UserStepWizard";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const submit = (data) => {
    saveStep(data);
  };

  return (
    <TemplatePage title="Adding new user">
      <UserStepWizard user={user} saveStep={saveStep} submit={submit} />
    </TemplatePage>
  );
};

export default NewUserPage;
