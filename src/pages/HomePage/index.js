import React, { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../components/TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";

import "./styles.css";
import { usersService } from "../../services/db/UsersService";

const HomePage = () => {
  const { push } = useHistory();
  const [isGenerate, setIsGenerate] = useState(false);
  const dispatch = useDispatch();

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const generateUsers = async () => {
    setIsGenerate(true);
    await usersService.generateUsers(50);
    fetchUsers();
    setIsGenerate(false);
  };

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
        {isLoading || isGenerate ? <Spinner /> : null}
        <Button onClick={generateUsers} disabled={isGenerate}>
          Generate accounts
        </Button>
      </>
    </TemplatePage>
  );
};

export default HomePage;
