import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as AddUser } from "../../icons/add-users.svg";
import { ReactComponent as ListOfUsers } from "../../icons/list-of-users.svg";
import logo from "./Logo.png";
import "./styles.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="center">
        <div className="header-content">
          <img src={logo} className="app-logo" alt="logo" />
          <nav className="header-menu">
            <ul className="header-menu-list">
              <li className="header-menu-item">
                <AddUser className="header-icon" id="add-user-icon" />
                <NavLink to={{ pathname: "/add-user" }} className="menu-link">
                  Add new user
                </NavLink>
              </li>
              <li className="header-menu-item">
                <ListOfUsers className="header-icon" id="list-of-users-icon" />
                <NavLink to={{ pathname: "/" }} className="menu-link">
                  List of users
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
