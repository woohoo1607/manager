import React from "react";
import ExternalLink from "../UI/ExternalLink";

const InformationItem = ({ title = "", value = "", link = "" }) => (
  <div className="user-information-block-item">
    <p className="user-information-title">{title}:</p>
    <p className="user-information-data">
      {link ? <ExternalLink link={link} title={value} /> : value}
    </p>
  </div>
);

export default InformationItem;
