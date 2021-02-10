import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";
import Notification from "./components/Notification";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes />
          <Notification />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
