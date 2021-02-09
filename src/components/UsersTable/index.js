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
          <TableHeadCell style={{ minWidth: "70px" }} />
          <TableHeadCell style={{ minWidth: "230px" }}>name</TableHeadCell>
          <TableHeadCell style={{ minWidth: "200px" }}>company</TableHeadCell>
          <TableHeadCell style={{ minWidth: "270px" }}>contacts</TableHeadCell>
          <TableHeadCell style={{ minWidth: "125px" }}>
            last update
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "37.5px" }} />
          <TableHeadCell style={{ minWidth: "37.5px" }} />
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((item, i) => (
          <RowItem
            key={i}
            user={item}
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
