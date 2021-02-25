import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkNetwork } from "../../actions/networkStatusActions";

import NetworkCircle from "../UI/NetworkCircle";
import { getLoggerEvents } from "../../actions/loggerActions";

const NetworkStatus = () => {
  const dispatch = useDispatch();

  const checkNetworkStatus = useCallback(() => dispatch(checkNetwork()), [
    dispatch,
  ]);
  const fetchLoggerData = useCallback(() => dispatch(getLoggerEvents()), [
    dispatch,
  ]);

  const { isOnline, isSynchronization } = useSelector(
    ({ networkStatus }) => networkStatus
  );
  const { awaitingDispatch } = useSelector(({ logger }) => logger);

  let status = isOnline ? "online" : "offline";
  if (isSynchronization) {
    status = "synchronization";
  } else if (awaitingDispatch.length) {
    status = "not-synchronized";
  }

  useEffect(() => {
    checkNetworkStatus();
    fetchLoggerData();
    let interval = setInterval(() => checkNetworkStatus(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [checkNetworkStatus, fetchLoggerData]);

  return <NetworkCircle status={status} />;
};

export default NetworkStatus;
