import { NavLink } from "react-router-dom";


function Navigation() {
  return (
     <>
      <div>
      <div>
      <nav>
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
              Starter & Bread Recipi
            </NavLink>
          </li>
          <li>
              <NavLink
              to="/croissants"
              className={({ isActive }) =>
                isActive === true ? "active-link" : "default-link"
              }
            >
              Croissants Recipi
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
