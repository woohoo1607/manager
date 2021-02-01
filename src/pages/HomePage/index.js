import React from "react";
import { useHistory } from "react-router-dom";

import TemplatePage from "../TemplatePage";
import UsersTable from "../../components/UsersTable";
import Button from "../../components/Button";

import "./styles.css";

const data = [
  {
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

  const createNewUser = () => push(`/users/new`);

  const deleteUser = (i) => () => {};

  return (
    <TemplatePage title="List of users">
      <>
        <UsersTable data={data} deleteUser={deleteUser} />
        {!data.length && (
          <div className="no-data">
            <h2 className="title title-secondary">No users here:(</h2>
            <Button onClick={createNewUser}>Create new user</Button>
          </div>
        )}
      </>
    </TemplatePage>
  );
};

export default HomePage;
