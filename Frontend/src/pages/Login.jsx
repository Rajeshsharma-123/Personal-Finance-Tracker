import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await registerUser(formData); // API call to register user
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000); // Redirect to login
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Sign Up
                </h2>
                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-600 p-2 rounded">
                        Registration successful! Redirecting to login...
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600"
                >
                    Sign Up
                </button>
                <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
