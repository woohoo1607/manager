import React from "react";

import "./styles.css";

const TableBody = ({ children, style = {} }) => (
  <tbody className="table__body" style={style}>
    {children}
  </tbody>
);

export default TableBody;
