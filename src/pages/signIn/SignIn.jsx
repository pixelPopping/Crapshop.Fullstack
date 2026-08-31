import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import LayoutFooter from "../../components/Footer/FooterLayout.jsx";
import {
  AuthContext,
} from "../../context/AuthContext/AuthContext.jsx";

import { loginUser } from "../../api/authApi";

import LoginForm from "../../components/loginform/LoginForm.jsx";

import styles from "./SigIn.module.css";

function SignIn() {
  const navigate = useNavigate();

  const {
    logIn,
    demoLogin,
  } = useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  // ==========================================
  // NORMAL LOGIN
  // ==========================================

  async function handleFormSubmit(data) {
    setLoading(true);
    setErrorMessage("");

    try {
      const response =
        await loginUser({
          email: data.email,
          password: data.password,
        });

      logIn(response.token);

      navigate("/");
    } catch (error) {
      console.error(
        "Login mislukt:",
        error
      );

      setErrorMessage(
        "Login mislukt. Controleer je e-mail en wachtwoord."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // DEMO LOGIN
  // ==========================================

  function handleDemoLogin() {
    setErrorMessage("");

    demoLogin();

    navigate("/");
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className={styles.outerLogin}
    >
      <main
        className={styles.signInpage}
      >
        <header>
          <h1
            className={styles.crapshop}
          >
            CrapShop
          </h1>

          <h2
            className={styles.crapshop}
          >
            Login
          </h2>
        </header>

        {loading && (
          <p>
            Even geduld, je wordt
            ingelogd...
          </p>
        )}

        <LoginForm
          onSubmit={handleFormSubmit}
          loading={loading}
          errorMessage={
            errorMessage
          }
        />

        {/* ==================================
            DEMO LOGIN
        ================================== */}

        <div
          className={
            styles.demoLogin
          }
        >
          <p>
            Wil je de applicatie
            bekijken zonder account?
          </p>

          <button
            type="button"
            onClick={
              handleDemoLogin
            }
            disabled={loading}
            className={
              styles.demoButton
            }
          >
            Try Demo
          </button>
        </div>
      </main>

      <div
        className={
          styles.footerContainer
        }
      >
        <footer>
          <LayoutFooter />
        </footer>
      </div>
    </div>
  );
}

export default SignIn;