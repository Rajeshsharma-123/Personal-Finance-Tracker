import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-lg font-bold">
                    Transactions App
                </Link>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="hover:underline"
                    >
                        Login
                    </Link>
                    <Link
                        to="/transactions"
                        className="hover:underline"
                    >
                        Transactions
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
