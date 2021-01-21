import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import UserForm from "../../components/UserForm";
import { addAccountData } from "./actions";

const UserFormContainer = () => {
  const [step, setStep] = useState(0);
  const history = useHistory();
  const pathnameBody = "/users/new/";

  const nextStep = () => {
    console.log(step);
    setStep(step + 1);
    console.log(step);
  };

  const previousStep = () => {
    setStep(step - 1);
  };
  /*const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  const addInfo = useCallback(() =>
    dispatch(addAccountData({ username: "woohoo", password: "12345" }), [
      dispatch,
    ])
  );
  useEffect(() => {
    if (!user.username.length) {
      addInfo();
    }
  }, [addInfo]);*/

  return <UserForm nextStep={nextStep} />;
};

export default UserFormContainer;
