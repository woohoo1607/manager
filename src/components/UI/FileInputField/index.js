import FormikField from "../../FormikField";
import FileInput from "../../FileInput";

const FileInputField = ({ name = "" }) => (
  <FormikField name={name}>
    <FileInput />
  </FormikField>
);

export default FileInputField;
