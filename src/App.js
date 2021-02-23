import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import PWAPrompt from "react-ios-pwa-prompt";

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
          <PWAPrompt
            promptOnVisit={1}
            timesToShow={3}
            copyClosePrompt="Close"
            permanentlyHideOnDismiss={false}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
