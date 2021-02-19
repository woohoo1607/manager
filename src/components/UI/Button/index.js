import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

const variants = [
  { name: "primary", className: "" },
  { name: "cancel", className: "button-cancel" },
  { name: "success", className: "button-success" },
];

const Button = ({
  type = "submit",
  variant = "primary",
  children,
  className,
  ...props
}) => {
  const { className: variantButton } =
    variants.find(({ name }) => name === variant) || "";
  return (
    <button
      className={`button ${className ? className : ""} ${variantButton}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
