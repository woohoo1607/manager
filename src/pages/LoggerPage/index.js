import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  getLoggerEvents,
  removeLogs,
  syncEvent,
} from "../../actions/loggerActions";

import TemplatePage from "../../components/TemplatePage";
import LoggerTable from "../../components/LoggerTable";
import NetworkStatusesList from "../../components/UI/NetworkStatusesList";
import Paginator from "../../components/Paginator";
import Button from "../../components/UI/Button";

import "./styles.css";

const NUMBER_OF_EVENTS_TO_SHOW = 10;

const LoggerPage = () => {
  const {
    push,
    location: { search },
  } = useHistory();

  const dispatch = useDispatch();

  const queryPage = new URLSearchParams(search).get("page") || 1;

  const fetchLoggerEvents = useCallback(() => dispatch(getLoggerEvents()), [
    dispatch,
  ]);

  const removeLoggerEvents = () => dispatch(removeLogs());

  const { events = [] } = useSelector(({ logger }) => logger);

  const [selectedEvents, setSelectedEvents] = useState(events);
  const [offset, setOffset] = useState(queryPage - 1);
  const dispatchEvent = (event) => () => dispatch(syncEvent(event));

  const changePage = ({ selected = 0 }) => {
    push(selected ? `/logger?page=${selected + 1}` : "/logger");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchLoggerEvents();
  }, [fetchLoggerEvents]);

  useEffect(() => {
    setOffset(queryPage - 1);
  }, [queryPage]);

  useEffect(() => {
    setSelectedEvents(
      events
        .sort((a, b) => b.date - a.date)
        .slice(
          offset * NUMBER_OF_EVENTS_TO_SHOW,
          offset * NUMBER_OF_EVENTS_TO_SHOW + NUMBER_OF_EVENTS_TO_SHOW
        )
    );
  }, [events, setSelectedEvents, offset]);

  return (
    <TemplatePage title="Logger">
      <div className="logger-page">
        <NetworkStatusesList />
        <LoggerTable events={selectedEvents} dispatchEvent={dispatchEvent} />
        {!events.length && (
          <div className="empty-logger">There are no events here</div>
        )}
        <Paginator
          offset={offset}
          countItems={events.length}
          queryPage={queryPage}
          showCount={NUMBER_OF_EVENTS_TO_SHOW}
          changePage={changePage}
        />
        <Button className="logger-page__button" onClick={removeLoggerEvents}>
          Remove logs
        </Button>
      </div>
    </TemplatePage>
  );
};

export default LoggerPage;
