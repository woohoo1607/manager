import React from "react";

import FormikField from "../../FormikField";
import FileInput from "../../FileInput";

const FileInputField = ({ name = "", avatar = null }) => (
  <FormikField name={name}>
    <FileInput title={avatar ? "edit avatar" : "add avatar"} />
  </FormikField>
);

export default FileInputField;
