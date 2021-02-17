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
  const { fieldName, error } = useSelector(
    ({ userForm: { fieldError } }) => fieldError
  );
  useEffect(() => {
    if (error) {
      setFieldError(fieldName, error);
    }
  }, [error, fieldName, setFieldError]);
  return (
    <form className="form" style={styles} onSubmit={handleSubmit}>
      <FormBody currentValues={props.values} {...props} children={children} />
    </form>
  );
};

export default FormikBody;
