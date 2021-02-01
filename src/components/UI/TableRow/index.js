import React from "react";

import "./styles.css";

const TableRow = ({ children, className, ...props }) => (
  <tr className={`table__row ${className ? className : ""}`} {...props}>
    {children}
  </tr>
);

export default TableRow;
