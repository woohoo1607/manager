import React from "react";
import { Formik } from "formik";

const LayoutForm = ({
  initialValues,
  validationSchema,
  submit,
  component,
  className,
}) => {
  const FormBody = component;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submit(values)}
    >
      {({ handleSubmit, ...props }) => {
        return (
          <form className={className} onSubmit={handleSubmit}>
            <FormBody currentValues={props.values} />
          </form>
        );
      }}
    </Formik>
  );
};

export default LayoutForm;
