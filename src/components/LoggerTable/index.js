import React, { useRef } from "react";

import TableHead from "../UI/TableHead";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import TableBody from "../UI/TableBody";
import Table from "../UI/Table";
import RowItem from "./RowItem";
import TableWrapper from "../UI/TableWrapper";

import "./styles.css";

const LoggerTable = ({ events = [], dispatchEvent = () => {} }) => {
  const tableRef = useRef(null);

  return (
    <TableWrapper>
      <Table ref={tableRef} className="logger-table" minWidth="580px">
        <TableHead>
          <TableRow>
            <TableHeadCell style={{ width: "10%" }}>event type</TableHeadCell>
            <TableHeadCell style={{ width: "35%" }}>event data</TableHeadCell>
            <TableHeadCell style={{ width: "14%" }}>successfully</TableHeadCell>
            <TableHeadCell style={{ width: "10%" }}>date</TableHeadCell>
            <TableHeadCell style={{ width: "10%" }}>last try</TableHeadCell>
            <TableHeadCell style={{ width: "10%" }}>awaiting</TableHeadCell>
            <TableHeadCell style={{ width: "11%" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(({ id, ...event }) => (
            <RowItem
              key={id}
              {...event}
              handleClick={dispatchEvent({ ...event, id })}
            />
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default LoggerTable;
