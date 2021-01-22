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
          <Field
            name="username"
            component={Input}
            isRequired={true}
            inputType="text"
            title="User name"
          />
        </div>
        <div className="account-form-input">
          <Field
            name="password"
            component={Input}
            isRequired={true}
            inputType="password"
            title="Password"
          />
        </div>
        <div className="account-form-input">
          <Field
            name="repeatPassword"
            component={Input}
            isRequired={true}
            inputType="password"
            title="Repeat Password"
          />
        </div>
        <div className="account-form-btn">
          <Button title="Forward" btnView="primary" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
