import React from "react";
import Button from "../Button";

const style = {
  width: "100%",
  border: "none",
  fontSize: "24px",
  fontWeight: "bold",
  background: "#EAF1FD",
  padding: "16px 0",
  color: "#000000",
};

const styleActive = {
  color: "#FFFFFF",
  background: "#4E86E4",
};

const styleDisabled = {
  color: "#9BB0CB",
  background: "rgba(151,186,244,0.2)",
};

const StepWizardHeader = ({ list }) => {
  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {list.map((item, i) => {
            return (
              <li className="step-wizard-menu-item" key={i}>
                <Button type={item.type} style={{ ...style, ...styleActive }}>
                  {i + 1 + ". " + item.title}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default StepWizardHeader;
