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
  { title: "Account", component: AccountForm },
  { title: "Profile", component: ProfileForm },
  { title: "Contacts", component: ContactsForm },
  { title: "Capabilities", component: CapabilitiesForm },
];

const EditUserPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tabName = history.location.pathname.split("/edit/")[1];
  const activeTab = steps.findIndex(
    (step) => step.title.toLowerCase() === tabName
  );

  const push = history.push;

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
        isEditMode={true}
        activeTab={activeTab}
        changeUrl={changeUrl}
      />
    </TemplatePage>
  );
};

export default EditUserPage;
