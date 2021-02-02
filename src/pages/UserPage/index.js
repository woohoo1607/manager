import React from "react";
import { useHistory } from "react-router-dom";

import TemplatePage from "../TemplatePage";
import UserInformation from "../../components/UserInformation";

import "./styles.css";

const user = {
  id: 1,
  avatar: null,
  username: "woohoo",
  password: "12345678",
  firstName: "Maksym",
  lastName: "Volkov",
  birthDate: "1993-07-15T22:00:00.000Z",
  email: "woohoo1607@gmail.com",
  address: "г. Сумы, ул. Ивани Сирко, 15",
  gender: "Male",
  company: "Brocoders",
  github: "github/woohoo1607",
  facebook: "https://facebook.com/woohoo1607",
  language: "English",
  fax: "+7 (233) 333 33 33",
  phones: ["+7 (233) 777 33 33"],
  skills: ["React", "Javascript", "NodeJS"],
  information: "Information about me",
  hobbies: ["Art", "Sport, fitness, aerobica and staff like that"],
};

const UserPage = () => {
  const { push } = useHistory();

  const goToEditUser = (tab = "") => () =>
    push(`/users/${user.id}/edit/${tab}`);

  return (
    <TemplatePage title="User Name" backLink="/" linkTitle="Users List">
      <UserInformation user={user} goToEditUser={goToEditUser} />
    </TemplatePage>
  );
};

export default UserPage;
