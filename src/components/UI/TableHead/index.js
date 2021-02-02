import React from "react";

import "./styles.css";

const TableHead = ({ children, ...props }) => (
  <thead className="table-head" {...props}>
    {children}
  </thead>
);

export default TableHead;
