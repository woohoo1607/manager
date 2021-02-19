import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Header from "../Header";
import InternalLink from "../UI/InternalLink";

import "./styles.css";

const TemplatePage = ({
  title = "",
  isBack = false,
  linkTitle = "",
  backLink = "",
  children,
}) => {
  const { goBack } = useHistory();
  const back = (e) => {
    if (!backLink) {
      e.preventDefault();
      goBack();
    }
  };
  return (
    <>
      <Header />
      <div className="center title-container">
        <div>
          {isBack && (
            <InternalLink
              onClick={(e) => back(e)}
              title={linkTitle}
              className="title-secondary"
              pathname={backLink}
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
