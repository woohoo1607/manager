import React, { useEffect, useRef, useState } from "react";

import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableBody from "../UI/TableBody";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import RowItem from "./RowItem";

const UsersTable = ({
  data = [],
  deleteUser = () => {},
  goToUserPage = () => {},
}) => {
  const tableRef = useRef(null);

  const [activeRow, setActiveRow] = useState(-1);
  const changeActiveRow = (i) => () => setActiveRow(i);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setActiveRow(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableRef, activeRow]);

  return (
    <Table ref={tableRef}>
      <TableHead>
        <TableRow>
          <TableHeadCell style={{ minWidth: "7.2%" }} />
          <TableHeadCell style={{ minWidth: "23.7%" }}>name</TableHeadCell>
          <TableHeadCell style={{ minWidth: "20.6%" }}>company</TableHeadCell>
          <TableHeadCell style={{ minWidth: "27.8%" }}>contacts</TableHeadCell>
          <TableHeadCell style={{ minWidth: "13.2%" }}>
            last update
          </TableHeadCell>
          <TableHeadCell style={{ minWidth: "3.75%" }} />
          <TableHeadCell style={{ minWidth: "3.75%" }} />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <RowItem
            key={i}
            data={item}
            index={i}
            deleteUser={deleteUser}
            changeActiveRow={changeActiveRow}
            activeRow={activeRow}
            goToUserPage={goToUserPage}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
