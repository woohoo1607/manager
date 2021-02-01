import React from "react";
import { useHistory } from "react-router-dom";

import TemplatePage from "../TemplatePage";

import "./styles.css";
import UserInformation from "../../components/UserInformation";

const user = {
  id: 1,
  avatar: null,
  username: "woohoo",
  password: "12345678",
  firstName: "Maksym",
  lastName: "Volkov",
  birthDate: "16.07.1993",
  email: "woohoo1607@gmail.com",
  address: "г. Сумы, ул. Ивани Сирко, 15",
  gender: "Male",
  company: "Brocoders",
  github: "github/woohoo1607",
  facebook: "facebook/woohoo1607",
  language: "English",
  fax: "+7 (233) 333 33 33",
  phones: ["+7 (233) 333 33 33"],
  skills: ["React", "Javascript", "NodeJS"],
  information: "Information about me",
  hobbies: ["Art", "Sport, fitness, aerobica and staff like that"],
};

const UserPage = () => {
  const { push } = useHistory();

  const goToUsersList = () => push(`/users/new`);

  return (
    <TemplatePage title="User Name">
      <UserInformation user={user} />
    </TemplatePage>
  );
};

export default UserPage;
