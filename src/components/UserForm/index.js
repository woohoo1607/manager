import React from "react";

import AccountForm from "./AccountForm";
import UserFormHeader from "./UserFormHeader";
import "./styles.css";

const list = [
  { title: "1. Account", type: "active" },
  { title: "2. Profile", type: "disabled" },
  { title: "3. Contacts", type: "disabled" },
  { title: "4. Capabilities", type: "disabled" },
];

const UserForm = ({ addData, user }) => {
  const { username, password, avatar } = user;
  return (
    <div className="user-form">
      <UserFormHeader list={list} />
      <AccountForm
        addData={addData}
        username={username}
        password={password}
        avatar={avatar}
      />
    </div>
  );
};

export default UserForm;
