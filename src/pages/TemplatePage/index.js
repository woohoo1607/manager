import React from "react";
import PropTypes from "prop-types";

import Index from "../../components/Header";
import "./styles.css";

const TemplatePage = ({ title, children }) => {
  return (
    <>
      <Index />
      <h2 className="title">{title}</h2>
      {children}
    </>
  );
};

TemplatePage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default TemplatePage;
