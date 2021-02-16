import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../../components/TemplatePage";
import UserStepWizard from "../../../components/UserStepWizard";
import { updateUser } from "../../../actions/userActions";

const EditUserPage = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector(({ users }) => users || {});
  const { username = "" } = user;

  const saveData = useCallback(
    (updateInfo) => dispatch(updateUser({ ...user, ...updateInfo })),
    [dispatch, user]
  );

  return (
    <TemplatePage
      title={`Editing ${username}`}
      backLink={`/users/${id}`}
      linkTitle="User Profile"
    >
      <UserStepWizard user={user} isEditMode submit={saveData} />
    </TemplatePage>
  );
};

export default EditUserPage;
