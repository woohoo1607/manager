import React from "react";

import AccountForm from "../../components/UserForms/AccountForm";
import ProfileForm from "../../components/UserForms/ProfileForm";
import ContactsForm from "../../components/UserForms/ContactsForm";
import CapabilitiesForm from "../../components/UserForms/CapabilitiesForm";
import StepWizardWrapper from "../../components/StepWizard";

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

const UserStepWizard = ({
  user = {},
  saveStep = () => {},
  submit = () => {},
  isEditMode = false,
  unsavedData,
  removeUnsavedData = () => {},
  loadUnsavedData = () => {},
}) => (
  <StepWizardWrapper
    steps={steps}
    data={user}
    saveStep={saveStep}
    submit={submit}
    isEditMode={isEditMode}
    unsavedData={unsavedData}
    removeUnsavedData={removeUnsavedData}
    loadUnsavedData={loadUnsavedData}
  />
);

export default UserStepWizard;
