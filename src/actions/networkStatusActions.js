import { TRIGGER_GET_NETWORK_STATUS } from "../sagas/networkStatusSaga";

export const checkNetwork = () => ({
  type: TRIGGER_GET_NETWORK_STATUS,
});
