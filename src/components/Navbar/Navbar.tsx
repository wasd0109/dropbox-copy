import React, { useState } from "react";
import { auth } from "../../utils/fbInit";
import { Link } from "react-router-dom";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const onLogout = () => {
    auth.signOut();
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 shadow-md">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-2xl tracking-tight">
          Dropbox-copy
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setShowNavbar(!showNavbar)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          showNavbar ? "" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto `}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400 mr-4"
          >
            Home
          </Link>
          <Link
            to="/setting"
            className="block text-xl mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400 mr-4"
          >
            Setting
          </Link>
          <button
            className="block text-xl mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-400"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
