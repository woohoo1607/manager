import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { syncEvent } from "../../actions/loggerActions";

import TableHead from "../UI/TableHead";
import TableRow from "../UI/TableRow";
import TableHeadCell from "../UI/TableHeadCell";
import TableBody from "../UI/TableBody";
import Table from "../UI/Table";

import RowItem from "./RowItem";
import "./styles.css";

const LoggerTable = () => {
  const dispatch = useDispatch();

  const tableRef = useRef(null);

  const { events = [] } = useSelector(({ logger }) => logger);

  const [selectedEvents, setSelectedEvents] = useState(events);

  const dispatchEvent = (event) => () => dispatch(syncEvent(event));

  useEffect(() => {
    setSelectedEvents(events.sort((a, b) => b.date - a.date));
  }, [events]);

  return (
    <Table ref={tableRef} className="logger-table">
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
        {selectedEvents.map(({ id, ...event }) => (
          <RowItem
            key={id}
            {...event}
            handleClick={dispatchEvent({ ...event, id })}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default LoggerTable;
