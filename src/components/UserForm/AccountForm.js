import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, getIn } from "formik";
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

const AccountForm = () => {
  const submit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={{ username: "", password: "", repeatPassword: "" }}
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
      <div>AVATAR</div>
      <div>
        <Field
          name="username"
          component={Input}
          isRequired={true}
          inputType="text"
          title="User name"
        />
        <Field
          name="password"
          component={Input}
          isRequired={true}
          inputType="password"
          title="Password"
        />
        <Field
          name="repeatPassword"
          component={Input}
          isRequired={true}
          inputType="password"
          title="Repeat Password"
        />
        <Button title="Forward" color="primary" type="submit" />
      </div>
    </form>
  );
};

export default AccountForm;
