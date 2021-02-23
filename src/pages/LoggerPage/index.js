import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLoggerEvents } from "../../actions/loggerActions";

import TemplatePage from "../../components/TemplatePage";
import NetworkCircle from "../../components/UI/NetworkCircle";

import "./styles.css";

const LoggerPage = () => {
  const dispatch = useDispatch();

  const fetchLoggerEvents = useCallback(() => dispatch(getLoggerEvents()), [
    dispatch,
  ]);

  const { events } = useSelector(({ logger }) => logger);

  useEffect(() => {
    fetchLoggerEvents();
  }, [fetchLoggerEvents]);

  return (
    <TemplatePage title="Logger">
      <>
        <ul className="network-statuses">
          <li className="network-status">
            <NetworkCircle status="online" />
            <p className="network-status__description">
              the application is online
            </p>
          </li>
          <li className="network-status">
            <NetworkCircle status="offline" />
            <p className="network-status__description">
              the application is offline
            </p>
          </li>
          <li className="network-status">
            <NetworkCircle status="not-synchronized" />
            <p className="network-status__description">
              the application is offline and there is unsaved data
            </p>
          </li>
          <li className="network-status">
            <NetworkCircle status="synchronization" />
            <p className="network-status__description">
              the application is online and it syncs
            </p>
          </li>
        </ul>
      </>
    </TemplatePage>
  );
};

export default LoggerPage;
