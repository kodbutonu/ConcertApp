import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavorites = () => {
    return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (event) => {
        // Favori etkinlikleri eklemek veya kaldırmak için bu fonksiyonu kullanabilirsiniz.
        if (favorites.includes(event)) {
            setFavorites(favorites.filter((fav) => fav !== event));
        } else {
            setFavorites([...favorites, event]);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
