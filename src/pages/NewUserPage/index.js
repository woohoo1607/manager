import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import StepWizard from "../../components/StepWizard";
import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";
import CapabilitiesForm from "../../components/UserForms/CapabilitiesForm";
import { useHistory } from "react-router-dom";
import { addUser } from "../../reducers/usersReducer";

const steps = [
  { title: "Account", component: AccountForm, urlName: "account" },
  { title: "Profile", component: ProfileForm, urlName: "profile" },
  { title: "Contacts", component: ContactsForm, urlName: "contacts" },
  {
    title: "Capabilities",
    component: CapabilitiesForm,
    urlName: "capabilities",
  },
];

const NewUserPage = () => {
  const dispatch = useDispatch();

  const push = useHistory().push;

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const changeUrl = (tab = "") => push(`/users/new/${tab}`);

  const createUser = useCallback((user) => dispatch(addUser(user)), [dispatch]);

  const submit = (data) => {
    const newUser = { ...user, ...data };
    delete newUser.repeatPassword;
    if (!newUser.phones[0].length) {
      newUser.phones = [];
    }
    newUser.lastUpdate = new Date();
    saveStep(data);
    createUser(newUser);
  };

  return (
    <TemplatePage title="Adding new user">
      <StepWizard
        steps={steps}
        data={user}
        saveStep={saveStep}
        submit={submit}
        changeUrl={changeUrl}
      />
    </TemplatePage>
  );
};

export default NewUserPage;
