import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TemplatePage from "../../../components/TemplatePage";
import UserStepWizard from "../../../components/UserStepWizard";
import { addUser } from "../../../actions/userActions";
import {
  checkUserForm,
  clearUserFormState,
  getUserForm,
  removeUserForm,
  updateUserForm,
} from "../../../actions/userFormActions";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const { user, isAvailable } = useSelector(({ userForm }) => userForm);

  const checkUserFormData = useCallback(() => dispatch(checkUserForm()), [
    dispatch,
  ]);

  const removeUnsavedData = () => dispatch(removeUserForm());

  const saveStep = (data) => dispatch(updateUserForm({ ...user, ...data }));

  const submit = (data) =>
    dispatch(
      addUser({ ...user, ...data, meta: { redirect: push, path: "/" } })
    );

  useEffect(() => {
    dispatch(clearUserFormState());
  }, [dispatch]);

  useEffect(() => {
    checkUserFormData();
  }, [checkUserFormData]);

  const loadUnsavedData = () => {
    dispatch(getUserForm({ meta: { redirect: push, path: "/users/new/" } }));
  };

  return (
    <TemplatePage title="Adding new user">
      <UserStepWizard
        user={user}
        saveStep={saveStep}
        submit={submit}
        isUnsavedData={isAvailable}
        removeUnsavedData={removeUnsavedData}
        loadUnsavedData={loadUnsavedData}
      />
    </TemplatePage>
  );
};

export default NewUserPage;
