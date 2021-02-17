import React from "react";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import TableRow from "../UI/TableRow";
import TableCell from "../UI/TableCell";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";
import Avatar from "../UI/Avatar";

const RowItem = ({
  user: {
    id,
    avatar,
    firstName = "",
    lastName = "",
    username = "",
    company = "",
    phones = [],
    email = "",
    lastUpdate,
  },
  deleteUser = () => {},
  index = 0,
  selectedRow,
  changeActiveRow = () => {},
  goToUserPage = () => {},
}) => {
  dayjs.extend(relativeTime);
  const isSelected = index === selectedRow;
  return (
    <TableRow className={isSelected ? "selected" : ""}>
      <TableCell>
        <Avatar
          avatar={avatar}
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            margin: "0 auto",
          }}
        />
      </TableCell>
      <TableCell>
        {`${firstName} ${lastName}`}
        <p style={{ fontSize: "9px" }}>{username}</p>
      </TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{phones[0] || email}</TableCell>
      <TableCell>{`${dayjs(lastUpdate).fromNow(true)} ago`}</TableCell>
      <TableCell>
        {!isSelected && (
          <IconButton
            onClick={goToUserPage(id)}
            icon="edit"
            className="table-cell__icon-button"
          />
        )}
      </TableCell>
      <TableCell>
        {!isSelected && (
          <IconButton
            onClick={changeActiveRow(index)}
            icon="close"
            className="table-cell__icon-button"
          />
        )}
      </TableCell>
      {isSelected && (
        <TableCell>
          <Button
            type="button"
            className="selected-row-button"
            onClick={deleteUser(id)}
          >
            x delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default RowItem;
