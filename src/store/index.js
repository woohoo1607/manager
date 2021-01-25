import { createStore, compose } from "redux";
import reducers from "./reducers";

// redux dev tool
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();

const store = createStore(reducers, enhancer);

export default store;
