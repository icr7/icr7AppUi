import "./App.css";
import { Nav } from "./MyComponent/Nav";
import { Todos } from "./MyComponent/Todos";

function App() {
  return (
    <div className="App">
      <Nav />
      <Todos />
    </div>
  );
}

export default App;
