import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getLoggerEvents } from "../../actions/loggerActions";

import TemplatePage from "../../components/TemplatePage";
import LoggerTable from "../../components/LoggerTable";
import NetworkStatusesList from "../../components/UI/NetworkStatusesList";

import "./styles.css";

const LoggerPage = () => {
  const dispatch = useDispatch();

  const fetchLoggerEvents = useCallback(() => dispatch(getLoggerEvents()), [
    dispatch,
  ]);

  useEffect(() => {
    fetchLoggerEvents();
  }, [fetchLoggerEvents]);

  return (
    <TemplatePage title="Logger">
      <>
        <NetworkStatusesList />
        <LoggerTable />
      </>
    </TemplatePage>
  );
};

export default LoggerPage;
