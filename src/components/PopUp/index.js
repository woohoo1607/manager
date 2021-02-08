import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PopUpWindow from "../UI/PopUpWindow";

import { closePopUp } from "../../reducers/actions";

const PopUp = () => {
  const dispatch = useDispatch();
  const { isOpen, msg, variant } = useSelector(({ popup }) => popup);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => dispatch(closePopUp()), 6000);
    }
  }, [isOpen]);

  return <>{isOpen && <PopUpWindow msg={msg} variant={variant} />}</>;
};

export default PopUp;
