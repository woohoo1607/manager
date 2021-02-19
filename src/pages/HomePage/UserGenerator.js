import React from "react";
import { useDispatch } from "react-redux";

import { generateUsers } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

import Button from "../../components/UI/Button";

const UserGenerator = ({ isLoading = false }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleClickGenerateUsers = () =>
    dispatch(
      generateUsers({
        count: 50,
        meta: { redirect: push, path: "/generate-success" },
      })
    );

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
