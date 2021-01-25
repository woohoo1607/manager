import React from "react";
import { Formik } from "formik";

const StepWizardBody = ({
  initialValues,
  validationSchema,
  submit,
  rightContent,
  leftContent,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submit(values)}
    >
      {({ handleSubmit, ...props }) => {
        return (
          <form className="step-wizard-body" onSubmit={handleSubmit}>
            <div className="step-wizard-left">
              {React.cloneElement(leftContent, { currentValues: props.values })}
            </div>
            <div className="step-wizard-right">
              {React.cloneElement(rightContent, {
                currentValues: props.values,
              })}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default StepWizardBody;
