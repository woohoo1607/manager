import React from "react";

import "./styles.css";

const TableHeadCell = ({ children, ...props }) => (
  <th className="table-head-cell" {...props}>
    {children}
  </th>
);

export default TableHeadCell;
