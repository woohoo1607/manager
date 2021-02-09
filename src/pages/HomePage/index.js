import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../reducers/actions";

import "./styles.css";
import Spinner from "../../components/UI/Spinner";

const HomePage = () => {
  const { push } = useHistory();

  const dispatch = useDispatch();

  const { users, isLoading } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable
          users={users}
          deleteUser={deleteUsr}
          goToUserPage={goToUserPage}
        />
        {!users.length && (
          <div className="no-data">
            <h2 className="title">No users here :(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        )}
        {isLoading && <Spinner />}
      </>
    </TemplatePage>
  );
};

export default HomePage;
