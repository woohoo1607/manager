import React from "react";

import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableBody from "../UI/TableBody";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import TableCell from "../UI/TableCell";

const UsersTable = ({ head = [], data = [] }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell style={{ width: "7.2%" }} />
          <TableHeadCell style={{ width: "23.7%" }}>name</TableHeadCell>
          <TableHeadCell style={{ width: "20.6%" }}>company</TableHeadCell>
          <TableHeadCell style={{ width: "27.8%" }}>contacts</TableHeadCell>
          <TableHeadCell style={{ width: "13.2%" }}>last update</TableHeadCell>
          <TableHeadCell style={{ width: "3.75%" }} />
          <TableHeadCell style={{ width: "3.75%" }} />
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>a</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
