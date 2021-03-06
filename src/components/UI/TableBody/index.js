import React from "react";

import "./styles.css";

const TableBody = ({ children, ...props }) => (
  <tbody className="table-body" {...props}>
    {children}
  </tbody>
);

export default TableBody;
