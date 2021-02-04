import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import StepWizard from "../../components/StepWizard";
import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";
import CapabilitiesForm from "../../components/UserForms/CapabilitiesForm";

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

const NewUserPage = ({ match: { url } }) => {
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
      <StepWizard
        steps={steps}
        data={user}
        saveStep={saveStep}
        submit={submit}
        basePath={url}
      />
    </TemplatePage>
  );
};

export default NewUserPage;
