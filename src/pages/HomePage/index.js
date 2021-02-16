import React, { useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../components/TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";
import { usersService } from "../../services/db/UsersService";
import { generateAccount, generateAvatar } from "../../helpers/generateAccount";
import { sendErrorNotification } from "../../actions/notificationActions";

import "./styles.css";

const generateFakeAccounts = ({ count = 50 }) => {
  const accounts = [];
  for (let i = 0; i < count; i++) {
    accounts.push(generateAccount());
  }
  return accounts;
};

const HomePage = () => {
  const { push } = useHistory();
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch();

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const handleClickGenerateUsers = () => setIsGenerating(true);

  useEffect(() => {
    let isMounted = true;
    if (isGenerating) {
      new Promise((resolve, reject) => {
        const accounts = generateFakeAccounts({ count: 50 });
        Promise.all(
          accounts.map((account) => {
            return new Promise((resolve, reject) => {
              generateAvatar().then((res) => {
                account.avatar = res;
                resolve(account);
              });
            });
          })
        )
          .then((res) => {
            usersService
              .clearAll()
              .then(() => {
                usersService
                  .addMany(res)
                  .then((res) => resolve(res))
                  .catch((err) => reject(err));
              })
              .catch((err) => reject(err));
          })
          .catch((err) => reject(err));
      })
        .then(() => (isMounted ? fetchUsers() : null))
        .catch(({ message = "error" }) => {
          dispatch(sendErrorNotification({ message }));
        })
        .finally(() => {
          return isMounted ? setIsGenerating(false) : null;
        });
    }
    return () => (isMounted = false);
  }, [isGenerating, dispatch, fetchUsers, setIsGenerating]);

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
        {!users.length && !(isLoading || isGenerating) && (
          <div className="no-data">
            <h2 className="title">No users here :(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        )}
        {isLoading || isGenerating ? <Spinner /> : null}
        <Button
          className="generate-button"
          onClick={handleClickGenerateUsers}
          disabled={isGenerating}
        >
          Generate accounts
        </Button>
      </>
    </TemplatePage>
  );
};

export default HomePage;
