import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import UserStepWizard from "../../components/UserStepWizard";
import {
  addAccountData,
  addUser,
  clearUserState,
} from "../../reducers/actions";
import { useHistory } from "react-router-dom";
import { getData, removeData } from "../../helpers/localStorageHelper";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const [unsavedData, setUnsavedData] = useState(null);

  const user = useSelector(({ user }) => user);

  const savePart = useCallback((data) => dispatch(addAccountData(data)), [
    dispatch,
  ]);

  const saveStep = (data) => savePart({ ...user, ...data });

  const createUser = useCallback((user) => dispatch(addUser(user)), [dispatch]);

  const submit = (data) =>
    createUser({ ...user, ...data, meta: { redirect: push, path: "/" } });

  useEffect(() => {
    dispatch(clearUserState());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const data = await getData("newUserData");
      if (data) {
        setUnsavedData(JSON.parse(data));
      }
    })();
  }, []);

  const removeUnsavedData = () => {
    setUnsavedData(null);
    removeData("newUserData");
  };

  const loadUnsavedData = () => {
    saveStep({ ...unsavedData, meta: { redirect: push, path: "/users/new" } });
    setUnsavedData(null);
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
