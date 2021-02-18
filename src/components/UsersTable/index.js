import React, { useEffect, useRef, useState } from "react";

import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableBody from "../UI/TableBody";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import RowItem from "./RowItem";

import "./styles.css";

const NO_SELECTED_ROW = -1;

const UsersTable = ({
  users = [],
  deleteUser = () => {},
  goToUserPage = () => {},
}) => {
  const tableRef = useRef(null);

  const [selectedRow, setSelectedRow] = useState(NO_SELECTED_ROW);
  const changeActiveRow = (i) => () => setSelectedRow(i);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(NO_SELECTED_ROW);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableRef, selectedRow]);

  const removeUser = (id) => () => {
    setSelectedRow(NO_SELECTED_ROW);
    deleteUser(id);
  };

  return (
    <Table ref={tableRef}>
      <TableHead>
        <TableRow>
          <TableHeadCell style={{ minWidth: "7.2%", maxWidth: "7.2%" }} />
          <TableHeadCell style={{ minWidth: "23.7%", maxWidth: "23.7%" }}>
            name
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "20.6%", maxWidth: "20.6%" }}>
            company
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "27.8%", maxWidth: "27.8%" }}>
            contacts
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "13.2%", maxWidth: "13.2%" }}>
            last update
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "3.75%", maxWidth: "3.75%" }} />
          <TableHeadCell style={{ minWidth: "3.75%", maxWidth: "3.75%" }} />
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, i) => (
          <RowItem
            key={user.id || i}
            user={user}
            index={i}
            deleteUser={removeUser}
            changeActiveRow={changeActiveRow}
            selectedRow={selectedRow}
            goToUserPage={goToUserPage}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
