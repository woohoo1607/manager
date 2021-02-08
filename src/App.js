import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";
import PopUp from "./components/PopUp";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes />
          <PopUp />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
