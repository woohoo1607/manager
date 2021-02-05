import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import UserStepWizard from "../../components/UserStepWizard";
import { addUser } from "../../reducers/usersReducer";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const createUser = useCallback((user) => dispatch(addUser(user)), [dispatch]);

  const submit = (data) => {
    const newUser = { ...user, ...data };
    delete newUser.repeatPassword;
    delete newUser.allowedUnsubmittedStep;
    newUser.lastUpdate = new Date();
    saveStep(data);
    createUser(newUser);
  };

  return (
    <TemplatePage title="Adding new user">
      <UserStepWizard user={user} saveStep={saveStep} submit={submit} />
    </TemplatePage>
  );
};

export default NewUserPage;
