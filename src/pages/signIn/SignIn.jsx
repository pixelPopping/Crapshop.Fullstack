import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navbar/Navigation.jsx";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { loginUser } from "../../api/authApi";

import LoginForm from "../../components/loginform/LoginForm.jsx";

import styles from "./SigIn.module.css";

function SignIn() {
  const navigate = useNavigate();

  const { logIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFormSubmit(data) {
    setLoading(true);
    setErrorMessage("");

    try {
      /*
      LOGIN REQUEST

      Stuurt de gegevens naar Flask.
      */

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      /*
      TOKEN OPSLAAN
      */

      logIn(response.token);

      navigate("/");
    } catch (error) {
      setErrorMessage("Login mislukt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <> 
    <div className={styles.outerLogin}>
    <main className={styles.signInpage}>
      <header>
        <h1 className={styles.crapshop}>CrapShop</h1>
        <h2 className={styles.crapshop}>Login</h2>
      </header>

      {loading && <p>Even geduld, je wordt ingelogd...</p>}

      <LoginForm
        onSubmit={handleFormSubmit}
        loading={loading}
        errorMessage={errorMessage}
      />
    </main>
    </div>
    </>
  );
}

export default SignIn;
