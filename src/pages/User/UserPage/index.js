import React, { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../../components/TemplatePage";
import UserInformation from "../../../components/UserInformation";
import { getUser } from "../../../actions/userActions";

const UserPage = () => {
  const { push } = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector(({ users }) => users || {});
  const { username = "" } = user;

  const goToEditUser = (tab = "") => () => push(`/users/${id}/edit/${tab}`);

  const fetchUser = useCallback((id) => dispatch(getUser(id)), [dispatch]);

  useEffect(() => {
    fetchUser(id);
  }, [id, fetchUser]);

  return (
    <TemplatePage title={username} backLink="/" linkTitle="Users List">
      <UserInformation user={user} goToEditUser={goToEditUser} />
    </TemplatePage>
  );
};

export default UserPage;
