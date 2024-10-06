import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { NavDropdown } from "react-bootstrap";
import { AppContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png"

const Navbar = ({ hamActive, setHamActive }) => {
  const { handleSignOut, isAuthenticated,user } = useContext(AppContext);
  const isAdmin = user?.role === "Admin";
  const vendor =  user?.role === "Vendor";

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
        <img src={logo} alt="logo" width={300} height={150} className={styles.brand} />
      </Link>
      <div className={`${styles.navRight} center`}>
        <div className="d-flex align-items-center">
          {isAuthenticated && (
          <div className={styles.navLinksWrapper}>
            <div className={styles.navLinksWrapper}>
              <Link to={"/OrderManagement"} className={`${styles.nav} center ${pathname === '/OrderManagement' && 'active'}`}>
                Order Management
              </Link>
            </div>
            {(vendor || isAdmin) && <div className={styles.navLinksWrapper}>
              <Link to={"/productManager"} className={`${styles.nav} center ${pathname === '/productManager' && 'active'}`}>
                Product Management
              </Link>
            </div>}
            {(vendor || isAdmin) && <div className={styles.navLinksWrapper}>
              <Link to={"/VendorManagement"} className={`${styles.nav} center ${pathname === '/VendorManagement' && 'active'}`}>
                Vendor Management
              </Link>
            </div>}
            {isAdmin && <div className={styles.navLinksWrapper}>
              <Link to={"/InventoryManagement"} className={`${styles.nav} center ${pathname === '/InventoryManagement' && 'active'}`}>
                Inventory Management
              </Link>
            </div>}
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
