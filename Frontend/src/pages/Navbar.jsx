import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">MyApp</Link>
                </h1>
                <ul className="flex space-x-4">
                    {!currentUser ? (
                        <>
                            <li>
                                <Link to="/login" className="hover:underline">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:underline">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/transactions" className="hover:underline">
                                    Transactions
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
