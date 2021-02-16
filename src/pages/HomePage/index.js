import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TemplatePage from "../../components/TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/UI/Button";
import { deleteUser, getUsers, setIsLoading } from "../../actions/userActions";
import Spinner from "../../components/UI/Spinner";
import Paginator from "../../components/Paginator";
import { usersService } from "../../services/db/UsersService";
import { generateAccount, generateAvatar } from "../../helpers/generateAccount";
import { sendErrorNotification } from "../../actions/notificationActions";

import "./styles.css";

const NUMBER_OF_USERS_TO_SHOW = 10;

const generateFakeAccounts = ({ count = 50 }) => {
  const accounts = [];
  for (let i = 0; i < count; i++) {
    accounts.push(generateAccount());
  }
  return accounts;
};

const HomePage = () => {
  const {
    push,
    location: { search },
  } = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const queryPage = query.get("page") || 1;

  const { users = [], isLoading = false } = useSelector(({ users }) => users);

  const [offset, setOffset] = useState(queryPage - 1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(users);

  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);
  const loading = useCallback(
    (payload = false) => dispatch(setIsLoading(payload)),
    [dispatch]
  );

  const createNewUser = () => push(`/users/new`);

  const deleteUsr = (id) => dispatch(deleteUser(id));

  const goToUserPage = (id) => () => push(`/users/${id}`);

  const changePage = ({ selected = 0 }) => {
    setOffset(selected);
    push(selected ? `/?page=${selected + 1}` : "/");
  };

  const handleClickGenerateUsers = () => setIsGenerating(true);

  useEffect(() => {
    let isMounted = true;
    if (isGenerating) {
      loading(true);
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
  }, [isGenerating, dispatch, fetchUsers, setIsGenerating, loading]);

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
        {!users.length && !isLoading ? (
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
        {isLoading ? <Spinner /> : null}
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
