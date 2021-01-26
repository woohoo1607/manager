import React from "react";

import Input from "../Input";
import PasswordInput from "../PasswordInput/PasswordInput";
import DateInput from "../DateInput";

const InputItem = ({ name, title, type, className }) => {
  /*TODO - DELETE THIS COMPONENT*/
  switch (type) {
    case "password": {
      return (
        <PasswordInput
          isRequired={true}
          name={name}
          type={type}
          title={title}
          className={className}
        />
      );
    }
    case "date": {
      return (
        <DateInput
          isRequired={true}
          name={name}
          type={type}
          title={title}
          className={className}
        />
      );
    }
    default:
      return (
        <Input
          isRequired={true}
          name={name}
          type={type}
          title={title}
          className={className}
        />
      );
  }
};

export default InputItem;
