import { Link, useLocation } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import { AppContext } from "../../context/AuthContext";
import { useContext } from "react";

const NavbarResponsive = ({ hamActive }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const { pathname } = location;
  const isAdmin = user?.role === "Admin";
  const vendor = user?.role === "Vendor";
  return (
    <div className={`${styles.navResWrapper} ${hamActive && styles.open}`}>
      <div className={styles.navResInner}>
        <Link
          to={"/routeManager"}
          className={`${styles.nav} center ${
            pathname === "/routeManager" && "active"
          }`}
        >
          Route Manager
        </Link>
        <Link
          to={"/OrderManagement"}
          className={`${styles.nav} center ${
            pathname === "/OrderManagement" && "active"
          }`}
        >
          Order Management
        </Link>
        {(vendor || isAdmin) && (
          <Link
            to={"/productManager"}
            className={`${styles.nav} center ${
              pathname === "/productManager" && "active"
            }`}
          >
            Product Management
          </Link>
        )}
        {(vendor || isAdmin) && (
          <Link
            to={"/VendorManagement"}
            className={`${styles.nav} center ${
              pathname === "/VendorManagement" && "active"
            }`}
          >
            Vendor Management
          </Link>
        )}
        {isAdmin && (
          <Link
            to={"/InventoryManagement"}
            className={`${styles.nav} center ${
              pathname === "/InventoryManagement" && "active"
            }`}
          >
            Inventory Management
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarResponsive;
