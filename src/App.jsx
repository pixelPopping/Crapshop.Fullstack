//prioriteiten
// 1 wheel of fortune
// 2 shopping cart
// 3 registreren en inloggen
// 4 zoek filter/ categorieen box
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import styles from "./components/wheelOfFortune/wheelspin.module.css";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import DetailPagina from "./pages/detailPagina/DetailPagina.jsx";
import Cart from "./pages/cartpage/Cart.jsx";
import Profile from "./pages/profile/Profile.jsx";
import SignUp from "./pages/signUP/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext.jsx";
import Recencies from "./pages/recencies/Recencies.jsx";
import CategoryPage from "./pages/categoryPage/CategoryPage.jsx";
import Favorite from "./pages/favorietenpage/Favorite.jsx";
import Checkout from "./pages/checkout/checkout.jsx";
import Success from "./pages/success/Succes.jsx";

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
<Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/profile"
    element={isAuth ? <Profile /> : <Navigate to="/signin" />}
  />

  <Route path="/signup" element={<SignUp />} />

  <Route path="/signin" element={<SignIn />} />

  <Route path="/shop" element={<Shop />} />

  <Route path="/detailpagina/:id" element={<DetailPagina />} />

  <Route path="/products/:category" element={<CategoryPage />} />

  <Route
    path="/cart"
    element={isAuth ? <Cart /> : <Navigate to="/signin" />}
  />

  <Route path="/recencies" element={<Recencies />} />

  <Route path="/favorietenpage" element={<Favorite />} />

   <Route path="/success" element={<Success/>} />


  <Route
    path="/checkout"
    element={isAuth ? <Checkout /> : <Navigate to="/signin" />}
  />
</Routes>
</>
  );
}

export default App;