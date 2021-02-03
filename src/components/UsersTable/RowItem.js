import React from "react";
import TableRow from "../UI/TableRow";
import TableCell from "../UI/TableCell";
import { ReactComponent as UserIcon } from "../../icons/list-of-users.svg";
import { ReactComponent as EditIcon } from "../../icons/Edit.svg";
import { ReactComponent as CloseIcon } from "../../icons/Close.svg";
import Button from "../Button";

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
  activeRow,
  changeActiveRow = () => {},
  goToUserPage = () => {},
}) => {
  const isActive = index === activeRow;
  return (
    <TableRow className={isActive ? "active" : ""}>
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
        {!isActive && (
          <EditIcon style={{ cursor: "pointer" }} onClick={goToUserPage(id)} />
        )}
      </TableCell>
      <TableCell>
        {!isActive && (
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={changeActiveRow(index)}
          />
        )}
      </TableCell>
      {isActive && (
        <TableCell>
          <Button type="button" className="delete-row" onClick={deleteUser(id)}>
            x delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default RowItem;
