import { NavLink, useNavigate } from "react-router-dom";
import FooterLayout from "../../components/Footer/FooterLayout";
import Navigation from "../../components/navbar/Navigation";


function Succes() {

   const navigate =useNavigate();

    return (
        <>
        <nav>
            <Navigation/>
        </nav>
        <header>
            <h1>Thank you for your purchase</h1>
        </header>
        <main>
            <section>
                <button type="button" onClick={() => navigate("/shop")}>to shop</button>
                <button type="button" onClick={() => navigate("/")}>Home</button>
            </section>
        </main>
        <footer>
            <FooterLayout/>
        </footer>
        </>
    )
}


export default Succes;