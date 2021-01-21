import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserForm from "../../components/UserForm";
import { addAccountData } from "./actions";

const UserFormContainer = () => {
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

  return <UserForm />;
};

export default UserFormContainer;
