import React from "react";

import "./styles.css";

const TableCell = ({ children, ...props }) => (
  <td className="table__cell" {...props}>
    {children}
  </td>
);

export default TableCell;
