import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import InternalLink from "../UI/InternalLink";

import "./styles.css";

const TemplatePage = ({
  title = "",
  isBack = false,
  linkTitle = "",
  pathname = "",
  children,
}) => {
  return (
    <>
      <Header />
      <div className="center title-container">
        <div>
          {isBack && (
            <InternalLink
              title={linkTitle}
              className="title-secondary"
              pathname={pathname}
              isBack
            />
          )}
        </div>
        <h2 className="title">{title}</h2>
        <div></div>
      </div>
      <div className="center content">{children}</div>
    </>
  );
};

TemplatePage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default TemplatePage;
