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
import { generateAccount } from "../../helpers/generateAccount";
import { openNotification } from "../../actions/notificationActions";

const HomePage = () => {
  const { push } = useHistory();
  const [isGenerate, setIsGenerate] = useState(false);
  const dispatch = useDispatch();

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const generateUsers = () => setIsGenerate(true);

  useEffect(() => {
    let isMounted = true;
    if (setIsGenerate) {
      const promises = [];
      new Promise((resolve) => {
        resolve(usersService.clearAll());
      })
        .then(() => {
          for (let i = 0; i < 50; i++) {
            promises.push(
              generateAccount().then((res) => usersService.add(res))
            );
          }
          Promise.all(promises)
            .then(() => (isMounted ? fetchUsers() : null))
            .catch(({ message = "error" }) => {
              dispatch(openNotification({ message, variant: "error" }));
            })
            .finally(() => {
              return isMounted ? setIsGenerate(false) : null;
            });
        })
        .catch(({ message }) => {
          dispatch(openNotification({ message, variant: "error" }));
        });
    }
    return () => (isMounted = false);
  }, [setIsGenerate, dispatch, fetchUsers]);

  useEffect(() => {
    generateUsers();
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
        {!users.length && !(isLoading || isGenerate) ? (
          <div className="no-data">
            <h2 className="title">No users here :(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        ) : null}
        {isLoading || isGenerate ? <Spinner /> : null}
        <Button
          className="generate_button"
          onClick={generateUsers}
          disabled={isGenerate}
        >
          Generate accounts
        </Button>
      </>
    </TemplatePage>
  );
};

export default HomePage;
