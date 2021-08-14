import React from "react";
import { auth } from "../../utils/fbInit";

function Main() {
  const onLogout = () => {
    auth.signOut();
  };
  return (
    <div className="h-screen">
      Main
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Main;
