import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const BtnTypes = ["active", "disabled", "success"];

const ButtonHeaderForm = ({ children, onClick, type }) => {
  return (
    <button className={`btn-header-form ${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

ButtonHeaderForm.propTypes = {
  type: PropTypes.oneOf(BtnTypes),
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonHeaderForm;
