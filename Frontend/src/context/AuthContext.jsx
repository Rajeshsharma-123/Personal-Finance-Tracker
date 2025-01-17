import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const { data } = await loginUser({ username, password});
            const { token } = data;
            localStorage.setItem("token", token);  //save the token in localstorage
            setUser({ username});  // Set the logged-in-user
            return true;
        } catch (err) {
            console.error("Login failed:", err.response.data.message || err.message);
            return false;
            
        }
    };

    const register = async(email, username, password) => {
        try{ 
            await registerUser({email, username, password });
            return true;
        } catch(err) {
            console.error("Registration failed:", err.response.data.message || err.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


