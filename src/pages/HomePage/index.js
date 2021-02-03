import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";

import Button from "../../components/Button";
import "./styles.css";
import { getUsers } from "../../reducers/usersReducer";

const data = [
  {
    id: 1,
    avatar: null,
    firstName: "Name 1",
    lastName: "Surname 1",
    username: "user",
    company: "Cool Company",
    phones: ["+7 (302) 224 22 22"],
    email: "user@mail.com",
    lastUpdate: "",
  },
  {
    id: 2,
    avatar: null,
    firstName: "Vova",
    lastName: "Korshunov",
    username: "korshun",
    company: "FOP",
    phones: [""],
    email: "korshun_fop@gmail.com",
    lastUpdate: "",
  },
  {
    id: 3,
    avatar: null,
    firstName: "Alex",
    lastName: "Green",
    username: "green",
    company: "IT",
    phones: [""],
    email: "alexGreen@gmail.com",
    lastUpdate: "",
  },
  {
    id: 4,
    avatar: null,
    firstName: "Viktor",
    lastName: "Morozov",
    username: "moroz",
    company: "MorozoV",
    phones: ["+7 (829) 394 32 43"],
    email: "vitia@mail.com",
    lastUpdate: "",
  },
];

const HomePage = () => {
  const { push } = useHistory();

  const dispatch = useDispatch();

  const fetchUsers = useCallback(() => dispatch(getUsers()), [dispatch]);

  const createNewUser = () => push(`/users/new`);

  const deleteUser = (id) => () => {};

  const goToUserPage = (id) => () => push(`/users/${id}`);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable
          data={data}
          deleteUser={deleteUser}
          goToUserPage={goToUserPage}
        />
        {!data.length && (
          <div className="no-data">
            <h2 className="title title-secondary">No users here:(</h2>
            <Button type="button" onClick={createNewUser}>
              Create new user
            </Button>
          </div>
        )}
      </>
    </TemplatePage>
  );
};

export default HomePage;
