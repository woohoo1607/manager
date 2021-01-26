import React from "react";
import { Formik } from "formik";

const LayoutForm = ({
  initialValues,
  validationSchema,
  submit,
  component,
  previousStep,
  showInRow = true,
  styles,
}) => {
  const inRowStyles = {
    display: "flex",
    justifyContent: "space-between",
  };

  const FormBody = component;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submit(values)}
    >
      {({ handleSubmit, ...props }) => {
        return (
          <form
            style={showInRow ? { ...inRowStyles, styles } : styles}
            onSubmit={handleSubmit}
          >
            <FormBody
              currentValues={props.values}
              {...props}
              previousStep={previousStep}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default LayoutForm;
