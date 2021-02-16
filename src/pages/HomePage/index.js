import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";
import Paginator from "../../components/Paginator";

import "./styles.css";

const NUMBER_OF_USERS_TO_SHOW = 10;

const HomePage = () => {
  const {
    push,
    location: { search },
  } = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryPage = query.get("page") || 1;

  const [offset, setOffset] = useState(queryPage - 1);

  const dispatch = useDispatch();

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const changePage = ({ selected = 0 }) => {
    if (selected !== offset) {
      setOffset(selected);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    push(`/?page=${offset + 1}`);
  }, [offset, push]);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable
          users={users.slice(
            offset * NUMBER_OF_USERS_TO_SHOW,
            offset * NUMBER_OF_USERS_TO_SHOW + NUMBER_OF_USERS_TO_SHOW
          )}
          deleteUser={deleteUsr}
          goToUserPage={goToUserPage}
        />
        {!users.length ? (
          <div className="no-data">
            <h2 className="title">No users here :(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        ) : (
          <Paginator
            offset={offset}
            countItems={users.length}
            queryPage={queryPage}
            showCount={NUMBER_OF_USERS_TO_SHOW}
            changePage={changePage}
          />
        )}
        {isLoading && <Spinner />}
      </>
    </TemplatePage>
  );
};

export default HomePage;
