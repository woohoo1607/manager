import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser, updateUser } from "../../../actions/userActions";

import TemplatePage from "../../../components/TemplatePage";
import UserStepWizard from "../../../components/UserStepWizard";

const EditUserPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector(({ users }) => users || {});
  const { username = "" } = user;

  const fetchUser = useCallback((id) => dispatch(getUser(id)), [dispatch]);

  useEffect(() => {
    const { id: stateId } = user;
    if (!stateId || stateId !== id) {
      fetchUser(id);
    }
  }, [id, user, fetchUser]);

  const saveData = useCallback(
    (updateInfo) => dispatch(updateUser({ ...user, ...updateInfo })),
    [dispatch, user]
  );

  return (
    <TemplatePage title={`Editing ${username}`} isBack linkTitle="User Profile">
      <UserStepWizard user={user} isEditMode submit={saveData} />
    </TemplatePage>
  );
};

export default EditUserPage;
