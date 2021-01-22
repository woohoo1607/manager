import React from "react";
import ButtonHeaderForm from "../ButtonHeaderForm";

const StepWizardHeader = ({ list }) => {
  return (
    <header className="step-wizard-header">
      <nav>
        <ul className="step-wizard-menu-list">
          {list.map((item, i) => {
            return (
              <li className="step-wizard-menu-item" key={i}>
                <ButtonHeaderForm type={item.type}>
                  {i + 1 + ". " + item.title}
                </ButtonHeaderForm>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default StepWizardHeader;
