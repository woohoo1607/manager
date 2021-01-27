import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "./actions";
import StepWizard from "../../components/StepWizard";
import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";

const steps = [
  { title: "Account", component: AccountForm },
  { title: "Profile", component: ProfileForm },
  { title: "Contacts", component: ContactsForm },
];

const NewUserPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const saveStep = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  return (
    <TemplatePage title="Adding new user">
      <StepWizard steps={steps} data={user} saveStep={saveStep} />
    </TemplatePage>
  );
};

export default NewUserPage;
