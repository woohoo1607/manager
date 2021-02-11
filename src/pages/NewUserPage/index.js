import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TemplatePage from "../TemplatePage";
import UserStepWizard from "../../components/UserStepWizard";
import {
  addAccountData,
  addUser,
  clearUserState,
  deleteTempUserData,
  getTempUserData,
} from "../../actions/userActions";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const { user, unsavedData } = useSelector(({ user }) => user);

  const fetchTempUserData = useCallback(() => dispatch(getTempUserData()), [
    dispatch,
  ]);

  const removeUnsavedData = () => dispatch(deleteTempUserData());

  const saveStep = (data) => dispatch(addAccountData({ ...user, ...data }));

  const submit = (data) =>
    dispatch(
      addUser({ ...user, ...data, meta: { redirect: push, path: "/" } })
    );

  useEffect(() => {
    dispatch(clearUserState());
  }, [dispatch]);

  useEffect(() => {
    fetchTempUserData();
  }, []);

  const loadUnsavedData = () => {
    saveStep({ ...unsavedData, meta: { redirect: push, path: "/users/new" } });
    removeUnsavedData();
  };

  return (
    <TemplatePage title="Adding new user">
      <UserStepWizard
        user={user}
        saveStep={saveStep}
        submit={submit}
        unsavedData={unsavedData}
        removeUnsavedData={removeUnsavedData}
        loadUnsavedData={loadUnsavedData}
      />
    </TemplatePage>
  );
};

export default NewUserPage;
