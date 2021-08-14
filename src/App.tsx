import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import UserNameModal from "./components/UserNameModal";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import { auth } from "./utils/fbInit";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner animation="border" style={{ height: "40vh", width: "40vh" }} />
      </div>
    );
  }
  return (
    <div>
      <Router>
        {user ? (
          <Switch>
            <Route path="/">
              <UserNameModal
                showUserNameModal={showUserNameModal}
                setShowUserNameModal={setShowUserNameModal}
              />
              <Main user={user} />
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
