import React from "react";

import ButtonHeaderForm from "../ButtonHeaderForm";
import AccountForm from "./AccountForm";
import "./styles.css";

const UserForm = ({ addData, user }) => {
  const { username, password, avatar } = user;
  return (
    <div className="user-form">
      <header className="user-form-header">
        <nav>
          <ul className="user-form-menu-list">
            <li className="user-form-menu-item">
              <ButtonHeaderForm type="active">1. Account</ButtonHeaderForm>
            </li>
            <li className="user-form-menu-item">
              <ButtonHeaderForm type="disabled">2. Profile</ButtonHeaderForm>
            </li>
            <li className="user-form-menu-item">
              <ButtonHeaderForm type="disabled">3. Contacts</ButtonHeaderForm>
            </li>
            <li className="user-form-menu-item">
              <ButtonHeaderForm type="disabled">
                4. Capabilities
              </ButtonHeaderForm>
            </li>
          </ul>
        </nav>
      </header>
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
