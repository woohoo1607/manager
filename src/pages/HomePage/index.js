import React, { useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";
import Paginator from "../../components/Paginator";

import "./styles.css";

const HomePage = () => {
  const {
    push,
    location: { search },
  } = useHistory();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const dispatch = useDispatch();

  const {
    users = [],
    isLoading = false,
    currentPage = 1,
    pages = 1,
  } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(({ page }) => dispatch(getUsers({ page })), [
    dispatch,
  ]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const changePage = ({ selected = 0 }) => {
    const selectedPage = selected + 1;
    if (selectedPage !== currentPage) {
      push(`/?page=${selectedPage}`);
    }
  };

  useEffect(() => {
    const queryPage = query.get("page") || 1;
    let page;
    if (queryPage > 0 && queryPage <= pages) {
      page = queryPage;
    } else {
      push(`/?page=${queryPage > pages ? pages : 1}`);
    }
    fetchUsers({ page });
  }, [fetchUsers, query, pages, push]);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable
          users={users}
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
            currentPage={currentPage}
            pages={pages}
            changePage={changePage}
          />
        )}
        {isLoading && <Spinner />}
      </>
    </TemplatePage>
  );
};

export default HomePage;
