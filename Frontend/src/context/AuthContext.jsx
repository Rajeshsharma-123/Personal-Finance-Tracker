import { createContext, useState } from "react";
import { loginUser, registerUser } from "../api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await loginUser({ username, password});
            const { token } = response;
            localStorage.setItem("token", token);  //save the token in localstorage
            setUser({ username});  // Set the logged-in-user
            return true;
        } catch (err) {

            const errorMessage = 
              err.response?.data?.message || "Login failed . please try again .";
            console.error("Login failed:", errorMessage);
            setError(errorMessage);  //Set the error state
            return false;
            
        }
    };
    // Register function
    const register = async(email, username, password) => {
        try{ 
            // Call the registerUser API function 
            await registerUser({email, username, password });
            setError(null); // Clear any previous errors
            return true;
        } catch (err) {
            // Handle errors and set an appropriate error message
            const errorMessage =
                err.response?.data?.message || "Registration failed. Please try again.";
            console.error("Registration failed:", errorMessage);
            setError(errorMessage); // Set the error state
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");  // Remove the token from localStorage
        setUser(null);  // Clear the use state
        setError(null); // Clear any errors
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


