import React, { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import TemplatePage from "../TemplatePage";
import UserInformation from "../../components/UserInformation";
import { getUserData } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserPage = () => {
  const { push } = useHistory();
  const { id } = useParams();

  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user || {});
  const { username = "" } = user;

  const goToEditUser = (tab = "") => () => push(`/users/${id}/edit/${tab}`);

  const fetchUser = useCallback((id) => dispatch(getUserData(id)), [dispatch]);

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
