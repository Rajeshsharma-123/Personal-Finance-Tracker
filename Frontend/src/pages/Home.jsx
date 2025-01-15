import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to the Transactions App
            </h1>
            <div className="space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    Login
                </Link>
                <Link
                    to="/transactions"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                >
                    View Transactions
                </Link>
            </div>
        </div>
    );
}

export default Home;
