import React from "react";

import "./styles.css";

const TableCell = ({ children, style = {} }) => (
  <td className="table__cell" style={style}>
    {children}
  </td>
);

export default TableCell;
