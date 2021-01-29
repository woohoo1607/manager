import React from "react";

import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableBody from "../UI/TableBody";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import TableCell from "../UI/TableCell";
import { ReactComponent as UserIcon } from "../../icons/list-of-users.svg";
import { ReactComponent as CloseIcon } from "../../icons/Close.svg";
import { ReactComponent as EditIcon } from "../../icons/Edit.svg";

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
        {data.map((item, i) => (
          <TableRow key={i} style={i % 2 ? {} : { backgroundColor: "#E7F0FF" }}>
            <TableCell>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  verticalAlign: "middle",
                  margin: "0 auto",
                }}
              >
                <UserIcon
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    verticalAlign: "middle",
                  }}
                />
              </div>
            </TableCell>
            <TableCell>
              {`${item.firstName}  ${item.lastName}`}
              <p style={{ fontSize: "9px" }}>{item.username}</p>
            </TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell>{item.phones[0] || item.email}</TableCell>
            <TableCell>{item.lastUpdate}</TableCell>
            <TableCell>
              <EditIcon style={{ cursor: "pointer" }} />
            </TableCell>
            <TableCell>
              <CloseIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
