import "./App.css";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";

function App() {
  return (
    <div className="App">
      <Header />
      <Button type="primary" title="Next" />
    </div>
  );
}

export default App;
