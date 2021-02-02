import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import "./styles.css";

const TemplatePage = ({ title, children }) => {
  return (
    <>
      <Header />
      <h2 className="title">{title}</h2>
      <div className="content">{children}</div>
    </>
  );
};

TemplatePage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default TemplatePage;
