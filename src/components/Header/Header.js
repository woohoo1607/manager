import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { ReactComponent as AddUser } from "../../icons/add-users.svg";
import { ReactComponent as ListOfUsers } from "../../icons/list-of-users.svg";
import logo from "./Logo.png";
import "./styles.css";

const Header = () => {
  const history = useHistory();
  const pathname = history.location.pathname;
  console.log(pathname);
  return (
    <header className="app-header">
      <div className="center">
        <div className="header-content">
          <img src={logo} className="app-logo" alt="logo" />
          <nav className="header-menu">
            <ul className="header-menu-list">
              <li className="header-menu-item">
                <AddUser
                  id="add-user-icon"
                  className={
                    pathname === "/"
                      ? "header-icon-active header-icon"
                      : "header-icon"
                  }
                />
                <NavLink
                  to={{ pathname: "/add-user" }}
                  className={
                    pathname === "/" ? "menu-link active-link" : "menu-link"
                  }
                >
                  Add new user
                </NavLink>
              </li>
              <li className="header-menu-item">
                <ListOfUsers
                  id="list-of-users-icon"
                  className={
                    pathname === "/add-user"
                      ? "header-icon-active header-icon"
                      : "header-icon"
                  }
                />
                <NavLink
                  to={{ pathname: "/" }}
                  className={
                    pathname === "/add-user"
                      ? "menu-link active-link"
                      : "menu-link"
                  }
                >
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
