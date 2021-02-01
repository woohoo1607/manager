import React from "react";

const InformationItem = ({ title = "", value = "" }) => (
  <div className="user-information-block-item">
    <p className="user-information-title">{title}:</p>
    <p className="user-information-data">{value}</p>
  </div>
);

export default InformationItem;
