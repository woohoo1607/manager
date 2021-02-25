import {
  TRIGGER_ADD_LOGGER_EVENT,
  TRIGGER_GET_LOGGER_EVENTS,
  TRIGGER_SYNCHRONIZE_EVENT,
} from "../sagas/loggerSaga";

export const getLoggerEvents = () => ({
  type: TRIGGER_GET_LOGGER_EVENTS,
});

export const addLoggerEvent = ({
  eventType = "",
  data,
  isSuccess = true,
  date,
  lastTry = new Date(),
  isAwaitingDispatch = false,
  error = "",
}) => ({
  type: TRIGGER_ADD_LOGGER_EVENT,
  eventType,
  data,
  isSuccess,
  date,
  lastTry,
  isAwaitingDispatch,
  error,
});

export const syncEvent = (event) => ({
  type: TRIGGER_SYNCHRONIZE_EVENT,
  event,
});
