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
  children,
}) => {
  const { goBack } = useHistory();
  const back = (e) => {
    e.preventDefault();
    goBack();
  };
  return (
    <>
      <Header />
      <div className="title-container">
        <div>
          {isBack && (
            <InternalLink
              onClick={(e) => back(e)}
              title={linkTitle}
              className="title-secondary"
              isBack
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
