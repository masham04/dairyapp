import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router className="App">
      <Route path='/' component={Login} exact />
      <Route path='/register' component={Signup} exact />
    </Router>
  );
}

export default App;
