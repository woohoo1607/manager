import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { ReactComponent as AddUser } from "../../icons/add-users.svg";
import { ReactComponent as ListOfUsers } from "../../icons/list-of-users.svg";
import logo from "./Logo.png";
import NetworkStatus from "../NetworkStatus";

import "./styles.css";

const Header = () => {
  const {
    location: { pathname },
  } = useHistory();

  const isAddUserFlow = pathname.split("/").includes("new");

  return (
    <header className="app-header">
      <div className="center">
        <div className="header-content">
          <NavLink to={{ pathname: "/" }}>
            <img src={logo} className="app-logo" alt="logo" />
          </NavLink>
          <nav className="header-menu">
            <ul className="header-menu-list">
              <li className="header-menu-item">
                <AddUser
                  id="add-user-icon"
                  className={`header-icon ${
                    !isAddUserFlow ? "header-icon-active" : ""
                  }`}
                />
                <NavLink
                  to={{ pathname: "/users/new" }}
                  className={`menu-link ${!isAddUserFlow ? "active-link" : ""}`}
                >
                  Add new user
                </NavLink>
              </li>
              <li className="header-menu-item">
                <ListOfUsers
                  id="list-of-users-icon"
                  className={`header-icon ${
                    isAddUserFlow ? "header-icon-active" : ""
                  }`}
                />
                <NavLink
                  to={{ pathname: "/" }}
                  className={`menu-link ${isAddUserFlow ? "active-link" : ""}`}
                >
                  List of users
                </NavLink>
              </li>
              <li className="header-menu-item">
                <NavLink to={{ pathname: "/" }} className={`menu-link`}>
                  <NetworkStatus />
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
