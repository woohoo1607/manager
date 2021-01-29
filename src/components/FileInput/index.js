import React from "react";
import { useFormikContext } from "formik";
import FileInputBase from "../UI/FileInputBase";

const FileInput = ({ name = "", title = "add avatar" }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <FileInputBase
      name={name}
      value={title}
      onChange={(event) => {
        setFieldValue(name, event.currentTarget.files[0]);
      }}
    />
  );
};

export default FileInput;
