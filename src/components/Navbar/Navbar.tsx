import React from "react";
import { auth } from "../../utils/fbInit";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import * as styles from "./Navbar.module.css";

function Navbar() {
  const logout = () => {
    auth.signOut();
  };
  return (
    <BootstrapNavbar bg="light" expand="lg" className={styles.navbar}>
      <BootstrapNavbar.Brand className={styles.siteTitle}>
        Dropbox Copy
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle
        aria-controls="basic-navbar-nav"
        className={styles.navbarToggle}
      />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="li">
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link as="li">
            <Link to="/setting" className={styles.link}>
              Setting
            </Link>
          </Nav.Link>
          <Nav.Link onClick={logout}>
            <p className={styles.link}>Logout</p>
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;
