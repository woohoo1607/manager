import React from "react";

import "./styles.css";

const Table = React.forwardRef(({ children, ...props }, ref) => (
  <table className="table" {...props} ref={ref}>
    {children}
  </table>
));

export default Table;
