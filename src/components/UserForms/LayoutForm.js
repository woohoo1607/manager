import React from "react";
import { Formik } from "formik";

const LayoutForm = ({
  initialValues,
  validationSchema,
  submit,
  component,
  styles,
  children,
}) => {
  const FormBody = component;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => submit(values)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, ...props }) => {
        return (
          <form className="form" style={styles} onSubmit={handleSubmit}>
            <FormBody
              currentValues={props.values}
              {...props}
              children={children}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default LayoutForm;
