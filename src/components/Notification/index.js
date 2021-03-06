import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideNotification } from "../../actions/notificationActions";

import NotificationWindow from "../UI/NotificationWindow";

const Notification = () => {
  const dispatch = useDispatch();
  const { isOpen, message, variant } = useSelector(
    ({ notification }) => notification
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => dispatch(hideNotification()), 6000);
    }
  }, [isOpen, dispatch]);

  return (
    <>
      {isOpen ? (
        <NotificationWindow message={message} variant={variant} />
      ) : null}
    </>
  );
};

export default Notification;
