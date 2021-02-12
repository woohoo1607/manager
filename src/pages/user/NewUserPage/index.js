import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../../components/TemplatePage";
import UserStepWizard from "../../../components/UserStepWizard";
import {
  addAccountData,
  addUser,
  clearUserState,
} from "../../../actions/userActions";
import { useHistory } from "react-router-dom";
import { getData, removeData } from "../../../helpers/localStorageHelper";

const NewUserPage = () => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const [unsavedData, setUnsavedData] = useState(null);

  const user = useSelector(({ user }) => user);

  const saveStep = (data) => dispatch(addAccountData({ ...user, ...data }));

  const submit = (data) =>
    dispatch(
      addUser({ ...user, ...data, meta: { redirect: push, path: "/" } })
    );

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
