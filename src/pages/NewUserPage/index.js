import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import UserStepWizard from "../../components/UserStepWizard";
import { addAccountData, addUser } from "../../reducers/actions";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const createUser = useCallback((user) => dispatch(addUser(user)), [dispatch]);

  const submit = (data) => {
    saveStep(data);
    createUser({ ...user, ...data });
  };

  return (
    <TemplatePage title="Adding new user">
      <UserStepWizard user={user} saveStep={saveStep} submit={submit} />
    </TemplatePage>
  );
};

export default NewUserPage;
