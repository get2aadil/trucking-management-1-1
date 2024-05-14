import React, { createContext, useState, useContext} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Declared as false initially

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an Auth Provider Kimmy');
    }

    const { isLoggedIn, setIsLoggedIn } = context;

    const login = () => {
        setIsLoggedIn(true);
    }

    const logout = () => {
        setIsLoggedIn(false);
    };

    return { isLoggedIn, setIsLoggedIn, login, logout};
}