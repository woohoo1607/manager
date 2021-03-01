import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import PWAPrompt from "react-ios-pwa-prompt";

import store from "./store";
import Routes from "./routes";
import Notification from "./components/Notification";

import "./App.css";

const Application = () => {
  const isDarkMode = useSelector(({ theme: { isDarkMode } }) => isDarkMode);
  useEffect(() => {
    document.body.classList.add(isDarkMode ? "dark" : "light");
    document.body.classList.remove(isDarkMode ? "light" : "dark");
  }, [isDarkMode]);
  return (
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
  );
};

function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}

export default App;
