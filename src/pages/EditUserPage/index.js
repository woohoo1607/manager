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

const EditUserPage = ({
  match: {
    params: { id },
    url,
  },
}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  /*  const currentTabIndex = steps.findIndex((step) => step.slug === slug);*/

  const user = useSelector((state) => state.user);

  const saveData = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  const changeUrl = (tab = "") => push(`/users/${id}/edit/${tab}`);

  return (
    <TemplatePage
      title="Adding new user"
      backLink={`/users/${id}`}
      linkTitle="User Profile"
    >
      <StepWizard
        steps={steps}
        data={user}
        submit={saveData}
        isEditMode
        /*        currentTabIndex={currentTabIndex}*/
        changeUrl={changeUrl}
        url={url}
      />
    </TemplatePage>
  );
};

export default EditUserPage;
