import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";

function Navigation() {
  return (
     <>
      <div className={styles.outerNavigation}>
      <div className={styles.navbarContainer}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Home Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Bakkery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipi"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Starter & Bread
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Gallery
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
      </div>
    </>
  );
}

export default Navigation;
