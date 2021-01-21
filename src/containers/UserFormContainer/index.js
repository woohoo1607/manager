import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import UserForm from "../../components/UserForm";
import { addAccountData } from "./actions";

const UserFormContainer = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [step, setStep] = useState(0);
  const history = useHistory();
  const pathnameBody = "/users/new/";

  const addData = useCallback((data) => dispatch(addAccountData({ ...data })), [
    dispatch,
  ]);

  const nextStep = () => {
    console.log(step);
    setStep(step + 1);
    console.log(step);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  return <UserForm addData={addData} user={user} />;
};

export default UserFormContainer;
