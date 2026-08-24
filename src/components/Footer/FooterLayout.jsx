import { NavLink } from "react-router-dom";
import styles from "./FooterLayout.module.css";

function FooterLayout() {
  return (
    <section className={styles.outerLayout}>
      <footer className={styles.layoutFooter}>
        <div className={styles.footerLinks}>
          <ul>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/recencies">Recensies</NavLink>
            </li>
            <li>
              <NavLink to="/favorietenpage">Favorites</NavLink>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}

export default FooterLayout;
