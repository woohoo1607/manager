import React from "react";
import { useDispatch } from "react-redux";
import { generateUsers } from "../../actions/userActions";

import Button from "../../components/UI/Button";

const UserGenerator = ({ isLoading = false }) => {
  const dispatch = useDispatch();

  const handleClickGenerateUsers = () => dispatch(generateUsers(50));

  return (
    <Button
      className="generate-button"
      onClick={handleClickGenerateUsers}
      disabled={isLoading}
    >
      Generate accounts
    </Button>
  );
};

export default UserGenerator;
