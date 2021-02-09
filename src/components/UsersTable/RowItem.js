import React from "react";
import TableRow from "../UI/TableRow";
import TableCell from "../UI/TableCell";
import { ReactComponent as UserIcon } from "../../icons/list-of-users.svg";
import Button from "../UI/Button";
import IconButton from "../UI/IconButton";

const RowItem = ({
  data: {
    id = 0,
    firstName = "",
    lastName = "",
    username = "",
    company = "",
    phones = [],
    email = "",
    lastUpdate = 0,
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
        {`${firstName}  ${lastName}`}
        <p style={{ fontSize: "9px" }}>{username}</p>
      </TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{phones[0] || email}</TableCell>
      <TableCell>{lastUpdate}</TableCell>
      <TableCell>
        {!isSelected && <IconButton onClick={goToUserPage(id)} icon="edit" />}
      </TableCell>
      <TableCell>
        {!isSelected && (
          <IconButton onClick={changeActiveRow(index)} icon="close" />
        )}
      </TableCell>
      {isSelected && (
        <TableCell style={{ position: "relative" }}>
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
