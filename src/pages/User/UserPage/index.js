import React, { useCallback, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, removeUsersError } from "../../../actions/userActions";

import TemplatePage from "../../../components/TemplatePage";
import UserInformation from "../../../components/UserInformation";
import Spinner from "../../../components/UI/Spinner";

const UserPage = () => {
  const { push } = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user = {}, isLoading, errorStatusCode } = useSelector(
    ({ users }) => users || {}
  );
  const { username = "" } = user;

  const goToEditUser = (tab = "") => () => push(`/users/${id}/edit/${tab}`);

  const fetchUser = useCallback((id) => dispatch(getUser(id)), [dispatch]);
  const removeError = useCallback(() => dispatch(removeUsersError()), [
    dispatch,
  ]);

  useEffect(() => {
    fetchUser(id);
    return () => removeError();
  }, [id, fetchUser, removeError]);

  if (errorStatusCode === 404) {
    return <Redirect to="/not-found" />;
  }

  return (
    <TemplatePage title={username} isBack linkTitle="Users List">
      {isLoading ? (
        <Spinner />
      ) : (
        <UserInformation user={user} goToEditUser={goToEditUser} />
      )}
    </TemplatePage>
  );
};

export default UserPage;
