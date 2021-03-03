import React from "react";

import { parseDate } from "../../helpers/dateHelper";

import TableCell from "../UI/TableCell";
import Button from "../UI/Button";
import TableRow from "../UI/TableRow";

const DataItem = ({ title = "", value }) => (
  <>
    <span className="bold-text">{title}:</span> {JSON.stringify(value)}
    <br />
  </>
);

const RowItem = ({
  eventType = "",
  data = {},
  isSuccess = true,
  error = "",
  date = "",
  lastTry = "",
  isAwaitingDispatch = false,
  handleClick = () => {},
}) => (
  <TableRow>
    <TableCell>{eventType}</TableCell>
    <TableCell style={{ textAlign: "start" }}>
      <p className="high-cell">
        {Object.entries(data).map(([title, value]) => (
          <DataItem key={title} title={title} value={value} />
        ))}
      </p>
    </TableCell>
    <TableCell>{isSuccess ? "success" : `fail / ${error}`}</TableCell>
    <TableCell>{parseDate({ date })}</TableCell>
    <TableCell>{parseDate({ date: lastTry })}</TableCell>
    <TableCell>{isAwaitingDispatch ? "true" : "false"}</TableCell>
    <TableCell>
      <Button
        className="logger-table__button"
        disabled={!isAwaitingDispatch}
        onClick={handleClick}
      >
        retry
      </Button>
    </TableCell>
  </TableRow>
);

export default RowItem;
