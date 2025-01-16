import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({email:'', username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Mock API call
        alert('Account created successfully!');
        navigate('/');
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
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

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
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
                    Sign Up
                </button>
                <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
