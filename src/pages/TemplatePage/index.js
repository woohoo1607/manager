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
        {backLink && (
          <InternalLink
            link={backLink}
            title={linkTitle}
            className="title-secondary"
            icon="back"
          />
        )}
        <h2 className="title" style={backLink ? {} : { textAlign: "center" }}>
          {title}
        </h2>
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
