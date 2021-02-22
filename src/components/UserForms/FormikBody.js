import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

const FormikBody = ({
  handleSubmit,
  styles,
  component,
  children,
  ...props
}) => {
  const FormBody = component;
  const { setFieldError } = useFormikContext();
  const { fieldsErrors } = useSelector(({ userForm }) => userForm);

  useEffect(() => {
    if (fieldsErrors.length) {
      fieldsErrors.map(({ fieldName, error }) =>
        setFieldError(fieldName, error)
      );
    }
  }, [fieldsErrors, setFieldError]);

  return (
    <form className="form" style={styles} onSubmit={handleSubmit}>
      <FormBody currentValues={props.values} {...props} children={children} />
    </form>
  );
};

export default FormikBody;
