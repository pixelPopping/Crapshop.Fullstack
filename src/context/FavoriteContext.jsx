import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import axios from "axios";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    const getStorageKey = () => user?.id ? `favorites_user_${user.id}` : "favorites_guest";

    useEffect(() => {
        const loadFavorites = async () => {
            const key = getStorageKey();
            const stored = localStorage.getItem(key);
            if (stored) setItems(JSON.parse(stored));

            if (user?.id) {
                try {
                    const res = await axios.get(
                        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${user.id}`,
                        { headers: { 'novi-education-project-id': 'b72992a3-9bd0-4e8c-84d5-0e24aff4e81b' } }
                    );
                    const serverFavorites = res.data.favorites || [];
                    setItems(prev => {
                        const combined = [...new Set([...prev, ...serverFavorites])];
                        localStorage.setItem(key, JSON.stringify(combined));
                        return combined;
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadFavorites();
    }, [user?.id]);

    useEffect(() => {
        const saveFavorites = async () => {
            const key = getStorageKey();
            localStorage.setItem(key, JSON.stringify(items));

            if (user?.id) {
                try {
                    await axios.put(
                        `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${user.id}/favorites`,
                        { favorites: items },
                        { headers: { 'novi-education-project-id': 'b72992a3-9bd0-4e8c-84d5-0e24aff4e81b' } }
                    );
                } catch (err) {
                    console.error(err);
                }
            }
        };
        saveFavorites();
    }, [items, user?.id]);

    const addFavorite = (item) => {
        if (!items.find(i => i.id === item.id)) setItems(prev => [...prev, item]);
    };

    const removeFavorite = (id) => setItems(prev => prev.filter(item => item.id !== id));

    const toggleFavorite = (item) => {
        if (items.find(i => i.id === item.id)) removeFavorite(item.id);
        else addFavorite(item);
    };

    const resetFavorites = () => setItems([]);

    return (
        <FavoriteContext.Provider
            value={{
                items,
                addFavorite,
                removeFavorite,
                toggleFavorite,
                resetFavorites,
                totalFavorites: items.length,
                setItems,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteProvider;









