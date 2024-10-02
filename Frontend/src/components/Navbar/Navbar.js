import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { NavDropdown } from "react-bootstrap";
import { AppContext } from "../../context/AuthContext";
import logo from "../../assets/bus-logo.svg"

const Navbar = ({ hamActive, setHamActive }) => {
  const { handleSignOut, isAuthenticated,user } = useContext(AppContext);

  const location = useLocation();
  const { pathname } = location;
  const handleClick = () => {
    setHamActive(!hamActive);
  };

  const handleSignOutFunc = async () => {
    handleSignOut();
  };

  return (
    <nav className={`${styles.navbarWrapper} center shadow-sm`}>
      <button
        className={`${styles.hamburger} ${hamActive && styles.active}`}
        onClick={handleClick}
      >
        <span className={styles.hamburgerLines}></span>
      </button>
      <Link to={"/"} className={`${styles.navLeft}`}>
        <img src={logo} alt="logo" width={300} height={300} className={styles.brand} />
      </Link>
      <div className={`${styles.navRight} center`}>
        <div className="d-flex align-items-center">
          {isAuthenticated && (
          <div className={styles.navLinksWrapper}>
            <div className={styles.navLinksWrapper} hidden={user?.isBusOwner}>
              <Link to={"/routeManager"} className={`${styles.nav} center ${pathname === '/routeManager' && 'active'}`}>
                Route Manager
              </Link>
            </div>
            <div className={styles.navLinksWrapper} hidden={!user?.isBusOwner}>
              <Link to={"/buslist"} className={`${styles.nav} center ${pathname === '/buslist' && 'active'}`}>
                Bus List Manager
              </Link>
            </div>
            <div className={styles.verticalLine} />
          </div>
        )}
          <NavDropdown title="Profile" hidden={!isAuthenticated}>
            <NavDropdown.Item>
              <div onClick={handleSignOutFunc} className={styles.login}>
                Sign Out
              </div>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
