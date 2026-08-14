import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";

function Navigation() {
  return (
    <div className={styles.navigation}>
      <section className={styles.innerNavbar}>
      <nav className={styles.navContainer}>
        <ul className={styles.unorderedList}>
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
              to="/Shop"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              SignIn
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recencies"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Recencies
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorietenpage"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Favorieten
            </NavLink>
          </li>
        </ul>
      </nav>
      </section>
    </div>
  );
}

export default Navigation;
