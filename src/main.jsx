import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import ShoppingCartProvider, { ShoppingCartContext } from './context/ShoppingCartContext.jsx';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import SpinProvider, { SpinContext } from './context/SpinContext.jsx';
import FavoriteProvider, { FavoriteContext } from './context/FavoriteContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <FavoriteProvider>
                    <ShoppingCartProvider>
                        <SpinProvider>
                            <App />
                        </SpinProvider>
                    </ShoppingCartProvider>
                </FavoriteProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
);
