import React from "react";
import { Formik } from "formik";
import FormikBody from "./FormikBody";

const LayoutForm = ({
  initialValues,
  validationSchema,
  submit,
  component,
  styles,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submit(values)}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ handleSubmit, ...props }) => (
        <FormikBody
          styles={styles}
          handleSubmit={handleSubmit}
          component={component}
          children={children}
          {...props}
        />
      )}
    </Formik>
  );
};

export default LayoutForm;
