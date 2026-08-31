import { NavLink, useNavigate } from "react-router-dom";

import FooterLayout from "../../components/Footer/FooterLayout";
import Navigation from "../../components/navbar/Navigation";

function Succes() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVIGATION */}

      <nav>
        <Navigation />
      </nav>

      {/* HEADER */}

      <header>
        <h1>
          Thank you for your purchase!
        </h1>

        <p>
          Your order has been completed
          successfully.
        </p>
      </header>

      {/* CONTENT */}

      <main>
        <section>
          <button
            type="button"
            onClick={() =>
              navigate("/Shop")
            }
          >
            To Shop
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
          >
            Home
          </button>
        </section>
      </main>

      {/* FOOTER */}

      <footer>
        <FooterLayout />
      </footer>
    </>
  );
}

export default Succes;