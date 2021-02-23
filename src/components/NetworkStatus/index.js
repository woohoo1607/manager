import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import NetworkCircle from "../UI/NetworkCircle";
import { checkNetwork } from "../../actions/networkStatusActions";

const NetworkStatus = () => {
  const dispatch = useDispatch();

  const checkNetworkStatus = useCallback(() => dispatch(checkNetwork()), [
    dispatch,
  ]);

  const { isOnline, isUnsynchronizedData, isSynchronization } = useSelector(
    ({ networkStatus }) => networkStatus
  );
  let status = isOnline ? "online" : "offline";
  if (isUnsynchronizedData) {
    status = "not-synchronized";
  } else if (isSynchronization) {
    status = "synchronization";
  }

  useEffect(() => {
    checkNetworkStatus();
    let interval = setInterval(() => checkNetworkStatus(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [checkNetworkStatus]);

  return <NetworkCircle status={status} />;
};

export default NetworkStatus;
