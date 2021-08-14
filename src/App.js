import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register/Register.tsx";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
