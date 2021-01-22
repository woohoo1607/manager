import React from "react";
import ButtonHeaderForm from "../ButtonHeaderForm";

const UserFormHeader = ({ list }) => {
  return (
    <header className="user-form-header">
      <nav>
        <ul className="user-form-menu-list">
          {list.map((item, i) => {
            return (
              <li className="user-form-menu-item" key={i}>
                <ButtonHeaderForm type={item.type}>
                  {item.title}
                </ButtonHeaderForm>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default UserFormHeader;
