import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
