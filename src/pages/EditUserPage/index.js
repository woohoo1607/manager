import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import StepWizard from "../../components/StepWizard";
import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";
import CapabilitiesForm from "../../components/UserForms/CapabilitiesForm";
import { addAccountData } from "../NewUserPage/actions";
import { useHistory } from "react-router-dom";

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

const EditUserPage = ({
  match: {
    params: { tabName },
  },
}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const currentTab = steps.findIndex((step) => step.urlName === tabName);

  const user = useSelector((state) => state.user);
  /*TODO delete below line after DB connect*/
  user.id = 0;
  const saveData = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const changeUrl = (tab = "") => push(`/users/${user.id}/edit/${tab}`);

  return (
    <TemplatePage
      title="Adding new user"
      backLink={`/users/${user.id}`}
      linkTitle="User Profile"
    >
      <StepWizard
        steps={steps}
        data={user}
        submit={saveData}
        isEditMode
        currentTab={currentTab}
        changeUrl={changeUrl}
      />
    </TemplatePage>
  );
};

export default EditUserPage;
