import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkNetwork } from "../../actions/networkStatusActions";

import NetworkCircle from "../UI/NetworkCircle";

const NetworkStatus = () => {
  const dispatch = useDispatch();

  const checkNetworkStatus = useCallback(() => dispatch(checkNetwork()), [
    dispatch,
  ]);

  const { isOnline } = useSelector(({ networkStatus }) => networkStatus);
  let status = isOnline ? "online" : "offline";

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
