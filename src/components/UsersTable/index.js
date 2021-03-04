import React, { useEffect, useRef, useState } from "react";

import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableBody from "../UI/TableBody";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import RowItem from "./RowItem";
import TableWrapper from "../UI/TableWrapper";

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
    <TableWrapper>
      <Table ref={tableRef} minWidth="580px">
        <TableHead>
          <TableRow>
            <TableHeadCell style={{ width: "7.2%" }} />
            <TableHeadCell style={{ width: "23.7%" }}>name</TableHeadCell>
            <TableHeadCell style={{ width: "20.6%" }}>company</TableHeadCell>
            <TableHeadCell style={{ width: "27.8%" }}>contacts</TableHeadCell>
            <TableHeadCell style={{ width: "13.2%" }}>
              last update
            </TableHeadCell>
            <TableHeadCell style={{ width: "3.75%" }} />
            <TableHeadCell style={{ width: "3.75%" }} />
            <TableHeadCell style={{ width: "0" }} />
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
    </TableWrapper>
  );
};

export default UsersTable;
