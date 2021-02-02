import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";
import InternalLink from "../../components/UI/InternalLink";

import "./styles.css";

const TemplatePage = ({
  title = "",
  backLink = "",
  linkTitle = "",
  children,
}) => {
  return (
    <>
      <Header />
      <div className="title-container">
        <div>
          {backLink && (
            <InternalLink
              pathname={backLink}
              title={linkTitle}
              className="title-secondary"
              icon="back"
            />
          )}
        </div>
        <h2 className="title">{title}</h2>
        <div></div>
      </div>
      <div className="content">{children}</div>
    </>
  );
};

TemplatePage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
};

export default TemplatePage;
