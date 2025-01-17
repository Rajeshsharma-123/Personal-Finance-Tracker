import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link to="/">Finance Tracker</Link>
            </h1>
            <div className="space-x-4">
                {user ? (
                    <>
                        <span>Welcome, {user.username}!</span>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="px-4 py-2 bg-gray-200 text-blue-500 rounded">
                            Login
                        </Link>
                        <Link to="/signup" className="px-4 py-2 bg-gray-200 text-blue-500 rounded">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
