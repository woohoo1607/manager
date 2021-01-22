import React from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import PropTypes from "prop-types";

import Input from "../Input";
import Button from "../Button";

const ValidationSchema = Yup.object({
  username: Yup.string().required("user name is required"),
  password: Yup.string().required("password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords don't match")
    .required("passwords don't match"),
});

const AccountForm = ({ addData, username, password, avatar }) => {
  const submit = (values) => addData(values);
  return (
    <Formik
      initialValues={{ username, password, repeatPassword: password }}
      validationSchema={ValidationSchema}
      onSubmit={(values) => submit(values)}
    >
      {(props) => <AddAccountUserDataForm {...props} />}
    </Formik>
  );
};

const AddAccountUserDataForm = ({ handleSubmit }) => {
  return (
    <form className="user-form-body" onSubmit={handleSubmit}>
      <div className="avatar-container"></div>
      <div>
        <div className="account-form-input">
          <Field name="username">
            {({ field: { value, onChange, onBlur }, meta }) => (
              <Input
                name="username"
                isRequired={true}
                inputType="text"
                title="User name"
                isError={meta.touched && Boolean(meta.error)}
                errMsg={meta.error}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </Field>
        </div>
        <div className="account-form-input">
          <Field name="password">
            {({ field: { value, onChange, onBlur }, meta }) => (
              <Input
                name="password"
                isRequired={true}
                inputType="password"
                title="Password"
                isError={meta.touched && Boolean(meta.error)}
                errMsg={meta.error}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </Field>
        </div>
        <div className="account-form-input">
          <Field name="repeatPassword">
            {({ field: { value, onChange, onBlur }, meta }) => (
              <Input
                name="repeatPassword"
                isRequired={true}
                inputType="password"
                title="Repeat Password"
                isError={meta.touched && Boolean(meta.error)}
                errMsg={meta.error}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          </Field>
        </div>
        <div className="account-form-btn">
          <Button title="Forward" btnView="primary" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
