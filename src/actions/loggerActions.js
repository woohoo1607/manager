import {
  TRIGGER_ADD_LOGGER_EVENT,
  TRIGGER_GET_LOGGER_EVENTS,
} from "../sagas/loggerSaga";

export const getLoggerEvents = () => ({
  type: TRIGGER_GET_LOGGER_EVENTS,
});

export const addLoggerEvent = (payload) => ({
  type: TRIGGER_ADD_LOGGER_EVENT,
  payload,
});
