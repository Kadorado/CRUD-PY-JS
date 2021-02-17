import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Users from "./components/Users";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <div className="container p-4">
        <NavBar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Users} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
