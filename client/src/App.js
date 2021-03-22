import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Notes from "./Pages/Notes";

function App() {
  
  return (
    <Router className="App">
      <Route  path="/" exact>
           <Redirect to='/login' />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} exact />
      <Route path='/all-notes' component={Notes} />
    </Router>
  );
}

export default App;
