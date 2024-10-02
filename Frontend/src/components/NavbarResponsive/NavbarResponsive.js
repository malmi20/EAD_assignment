import { Link, useLocation } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";

const NavbarResponsive = ({ hamActive }) => {
  const location = useLocation();
  const { pathname } = location;
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
          to={"/ticketingManger"}
          className={`${styles.nav} center ${
            pathname === "/ticketingManger" && "active"
          }`}
        >
          Ticketing Manager
        </Link>
      </div>
    </div>
  );
};

export default NavbarResponsive;
