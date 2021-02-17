import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../components/TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";
import Paginator from "../../components/Paginator";
import UserGenerator from "./UserGenerator";

import "./styles.css";

const NUMBER_OF_USERS_TO_SHOW = 10;

const HomePage = () => {
  const {
    push,
    location: { search },
  } = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryPage = query.get("page") || 1;

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const [offset, setOffset] = useState(queryPage - 1);

  const [selectedUsers, setSelectedUsers] = useState(users);

  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const changePage = ({ selected = 0 }) => {
    setOffset(selected);
    push(selected ? `/?page=${selected + 1}` : "/");
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setSelectedUsers(
      users.slice(
        offset * NUMBER_OF_USERS_TO_SHOW,
        offset * NUMBER_OF_USERS_TO_SHOW + NUMBER_OF_USERS_TO_SHOW
      )
    );
  }, [offset, push, users]);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable
          users={selectedUsers}
          deleteUser={deleteUsr}
          goToUserPage={goToUserPage}
        />
        {!users.length && !isLoading && (
          <div className="no-data">
            <h2 className="title">No users here :(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        )}
        {users.length > NUMBER_OF_USERS_TO_SHOW && (
          <Paginator
            offset={offset}
            countItems={users.length}
            queryPage={queryPage}
            showCount={NUMBER_OF_USERS_TO_SHOW}
            changePage={changePage}
          />
        )}
        {isLoading ? <Spinner /> : null}
        <UserGenerator isLoading={isLoading} />
      </>
    </TemplatePage>
  );
};

export default HomePage;
