import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import StepWizard from "../../components/StepWizard";
import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";
import CapabilitiesForm from "../../components/UserForms/CapabilitiesForm";
import { useHistory } from "react-router-dom";

const steps = [
  {
    title: "Account",
    component: AccountForm,
    slug: "account",
  },
  {
    title: "Profile",
    component: ProfileForm,
    slug: "profile",
  },
  {
    title: "Contacts",
    component: ContactsForm,
    slug: "contacts",
  },
  {
    title: "Capabilities",
    component: CapabilitiesForm,
    slug: "capabilities",
  },
];

const NewUserPage = ({ match: { path } }) => {
  const dispatch = useDispatch();

  const { push } = useHistory();

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const changeUrl = (tab = "") => push(`/users/new/${tab}`);

  const submit = (data) => {
    saveStep(data);
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
