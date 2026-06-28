//prioriteiten
// 1 wheel of fortune
// 2 shopping cart
// 3 registreren en inloggen
// 4 zoek filter/ categorieen box
import {Routes, Route, Navigate,} from 'react-router-dom';
import './App.css';
import './components/wheelOfFortune/wheelspin.css';
import Home from './pages/home/Home.jsx';
import Shop from './pages/shop/Shop.jsx';
import DetailPagina from './pages/detailPagina/DetailPagina.jsx';
import Cart from './pages/cartpage/Cart.jsx';
import Profile from "./pages/profile/Profile.jsx";
import SignUp from "./pages/signUP/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import Recencies from "./pages/recencies/Recencies.jsx";
import CategoryPage from "./pages/categoryPage/CategoryPage.jsx";
import Favorite from "./pages/favorietenpage/Favorite.jsx";


function App () {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/profile" element={ isAuth ? <Profile/> : <Navigate to="/signin"/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/Shop" element={<Shop/>} />
                <Route path="/detailpagina/:id" element={<DetailPagina/>}/>
                <Route path="/products/:category" element={<CategoryPage/>}/>
                <Route path="/cart" element={isAuth ? <Cart/> : <Navigate to="/"/>} />
                <Route path="/recencies" element={<Recencies/>} />
                <Route path="/favorietenpage" element={<Favorite/>} />
            </Routes>
        </>
    )

}
export default App

