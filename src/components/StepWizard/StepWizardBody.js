import React from "react";
import { Formik } from "formik";

const StepWizardBody = ({
  leftContent,
  rightContent,
  initialValues,
  validationSchema,
  addData,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => addData(values)}
    >
      {({ handleSubmit, ...props }) => {
        return (
          <form className="step-wizard-body" onSubmit={handleSubmit}>
            <div className="step-wizard-left">{leftContent}</div>
            <div className="step-wizard-right">{rightContent}</div>
          </form>
        );
      }}
    </Formik>
  );
};

export default StepWizardBody;
