import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.username, formData.password);
        if (success) {
            navigate("/transactions");
        }
        else {
            setError("Invalid credentials . Please try again . ");
        }
    };
            

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Login
                </h2>
                {error && <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                    Login
                </button>
                <p className="text-center text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
