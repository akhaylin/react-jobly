import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

/**
 * Renders Nav bar Links depending on if user is logged in
 *
 * App -> Nav -> {Link,...}
 */
function Nav({ logout }) {
  const username = useContext(userContext)?.username;

  function navUserLoggedIn() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/companies`}>Companies</Link>
        </li>
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/jobs`}>Jobs</Link>
        </li>
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/profile`}>Profile</Link>
        </li>
        <li className="nav-item nav-link">
          <Link onClick={logout} className="nav-link" aria-current="page" to={`/`}>Logout: {username}</Link>
        </li>
      </ul>
    );
  }

  function navUserLoggedOut() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/login`}>Login</Link>
        </li>
        <li className="nav-item nav-link">
          <Link className="nav-link" aria-current="page" to={`/signup`}>Sign Up</Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={`/`}>Jobly</Link>
        <div id="navbarSupportedContent">
          {username ? navUserLoggedIn() : navUserLoggedOut()}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
