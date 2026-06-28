import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import LoginForm from "../../components/loginform/LoginForm.jsx";
import './SigIn.css';

function SignIn() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleFormSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post(
                `/api/login`,
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                        "novi-education-project-id": "b72992a3-9bd0-4e8c-84d5-0e24aff4e81b",
                    },
                }
            );

            const token = response.data.token;
            localStorage.setItem("token", token);
            login(token);
            navigate("/");
        } catch (error) {
            setErrorMessage("Login Error try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="signin-page">
            <header>
                <h1 className="crapshop"> CrapShop</h1>
                <h2 className="crapshop">Login</h2>
            </header>
            {loading && <p>One moment, you proceed to be logged in...</p>}
            <LoginForm onSubmit={handleFormSubmit} loading={loading} errorMessage={errorMessage} />
        </main>
    );
}

export default SignIn;







