import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, getUsers } from "../../actions/userActions";

import TemplatePage from "../../components/TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Paginator from "../../components/Paginator";
import UserGenerator from "./UserGenerator";
import Search from "../../components/Search";

import "./styles.css";

const NUMBER_OF_USERS_TO_SHOW = 10;

const buildUrl = (parameters = []) => {
  const url = parameters.filter((el) => el !== null).join("&");
  return url ? `?${url}` : "";
};

const HomePage = () => {
  const {
    push,
    location: { search },
  } = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryPage = query.get("page") || 1;
  const querySearch = query.get("search") || "";

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const [offset, setOffset] = useState(queryPage - 1);

  const [selectedUsers, setSelectedUsers] = useState(users);
  const [usersFound, setUsersFound] = useState(users);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const changePage = ({ selected = 0 }) => {
    setOffset(selected);
    const parameters = [
      selected ? `page=${selected + 1}` : null,
      querySearch ? `search=${querySearch}` : null,
    ];
    push(buildUrl(parameters));
    window.scrollTo(0, 0);
  };

  const handleClickSearch = (value) => {
    const query = value.toLowerCase();
    const parameters = [
      offset ? `page=${offset + 1}` : null,
      query ? `search=${query}` : null,
    ];
    push(buildUrl(parameters));
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (!querySearch && usersFound.length !== users.length) {
      setUsersFound(users);
    }
  }, [querySearch, usersFound, users]);

  useEffect(() => {
    if (users.length) {
      if (querySearch && querySearch !== searchValue) {
        const result = users.filter(
          ({ firstName = "", lastName = "" }) =>
            firstName.toLowerCase().includes(querySearch) ||
            lastName.toLowerCase().includes(querySearch)
        );
        setSearchValue(querySearch);
        setUsersFound(result);
      } else if (!querySearch && searchValue) {
        setSearchValue("");
      }
    }
  }, [querySearch, usersFound, users, searchValue]);

  useEffect(() => {
    setSelectedUsers(
      usersFound.slice(
        offset * NUMBER_OF_USERS_TO_SHOW,
        offset * NUMBER_OF_USERS_TO_SHOW + NUMBER_OF_USERS_TO_SHOW
      )
    );
  }, [usersFound, setSelectedUsers, offset]);

  useEffect(() => {
    setOffset(queryPage - 1);
  }, [queryPage]);

  return (
    <TemplatePage title="List of users">
      <>
        <Search handleClick={handleClickSearch} querySearch={querySearch} />
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
        <Paginator
          offset={offset}
          countItems={usersFound.length}
          queryPage={queryPage}
          showCount={NUMBER_OF_USERS_TO_SHOW}
          changePage={changePage}
        />
        {isLoading ? <Spinner /> : null}
        <UserGenerator isLoading={isLoading} />
      </>
    </TemplatePage>
  );
};

export default HomePage;
