import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationWindow from "../UI/NotificationWindow";
import { closeNotification } from "../../actions/notificationActions";

const Notification = () => {
  const dispatch = useDispatch();
  const { isOpen, message, variant } = useSelector(
    ({ notification }) => notification
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => dispatch(closeNotification()), 6000);
    }
  }, [isOpen, dispatch]);

  return (
    <>{isOpen && <NotificationWindow message={message} variant={variant} />}</>
  );
};

export default Notification;
