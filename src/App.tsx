import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserNameModal from "./components/UserNameModal";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { auth } from "./utils/fbInit";
import ReactLoading from "react-loading";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const [showUserNameModal, setShowUserNameModal] = useState(false);
  const [loading, setLoading] = useState(true);
  auth.onAuthStateChanged((user) => {
    console.log(user?.displayName);
    if (user === null) {
      setUser(null);
    } else if (user.displayName === null) {
      setShowUserNameModal(true);
      setUser(user);
    } else {
      setUser(user);
    }
    setLoading(false);
  });
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ReactLoading
          type="spin"
          height={"50%"}
          width={"50%"}
          color="#4299e1"
        />
      </div>
    );
  }
  return (
    <div>
      <Router>
        {user ? (
          <Switch>
            <Route path="/">
              {showUserNameModal ? (
                <UserNameModal setShowUserNameModal={setShowUserNameModal} />
              ) : null}
              <Main />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
