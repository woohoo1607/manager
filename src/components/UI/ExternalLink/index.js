import React from "react";

import "./styles.css";

const ExternalLink = ({ link = "", title = "", ...props }) => (
  <a
    href={`${link}`}
    className="external-link"
    target="_blank"
    rel="noreferrer"
    {...props}
  >
    {title}
  </a>
);

export default ExternalLink;
