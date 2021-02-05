import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import { addAccountData } from "../NewUserPage/actions";
import UserStepWizard from "../../components/UserStepWizard";

const EditUserPage = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  const saveData = useCallback(
    (data) => dispatch(addAccountData({ ...data })),
    [dispatch]
  );

  return (
    <TemplatePage
      title="Adding new user"
      backLink={`/users/${id}`}
      linkTitle="User Profile"
    >
      <UserStepWizard user={user} isEditMode submit={saveData} />
    </TemplatePage>
  );
};

export default EditUserPage;
