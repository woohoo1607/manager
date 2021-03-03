import React from "react";

import { getRelativeTime } from "../../helpers/dateHelper";

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
        <p className="username">{username}</p>
      </TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{phones[0] || email}</TableCell>
      <TableCell>{getRelativeTime(lastUpdate)}</TableCell>
      <TableCell>
        {!isSelected && <IconButton onClick={goToUserPage(id)} icon="edit" />}
      </TableCell>
      <TableCell>
        {!isSelected && (
          <IconButton onClick={changeActiveRow(index)} icon="close" />
        )}
      </TableCell>
      <TableCell style={{ maxWidth: 0, padding: 0 }}>
        {isSelected && (
          <Button
            type="button"
            className="selected-row-button"
            onClick={deleteUser(id)}
          >
            x delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RowItem;
