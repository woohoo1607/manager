import React from "react";
import * as dayjs from "dayjs";

import TableCell from "../UI/TableCell";
import Button from "../UI/Button";
import TableRow from "../UI/TableRow";

const DataItem = ({ title = "", value }) => (
  <p>
    <span style={{ fontWeight: "bold" }}>{title}:</span> {JSON.stringify(value)}
    <br />
  </p>
);

const parseDate = (date) =>
  dayjs(date).isValid() ? dayjs(date).format("DD.MM.YYYY hh:mm:ss") : "";

const RowItem = ({
  eventType = "",
  data = {},
  isSuccess = true,
  error = "",
  date = "",
  lastTry = "",
  isAwaitingDispatch = false,
}) => (
  <TableRow>
    <TableCell>{eventType}</TableCell>
    <TableCell style={{ textAlign: "start" }}>
      {Object.entries(data).map(([title, value]) => (
        <DataItem key={title} title={title} value={value} />
      ))}
    </TableCell>
    <TableCell>{isSuccess ? "success" : `fail / ${error}`}</TableCell>
    <TableCell>{parseDate(date)}</TableCell>
    <TableCell>{parseDate(lastTry)}</TableCell>
    <TableCell>{isAwaitingDispatch ? "true" : "false"}</TableCell>
    <TableCell>
      <Button className="logger-table__button" disabled={!isAwaitingDispatch}>
        retry
      </Button>
    </TableCell>
  </TableRow>
);

export default RowItem;
