import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("Attempting login to:", `${API_URL}/api/users/login`);
            const response = await axios.post(`${API_URL}/api/users/login`, formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            navigate('/dashboard'); 
        } catch (err) {
            console.error(err);
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || 'Login failed. Server connection issue.';
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full bg-[#1c2a26] border border-[#2d403a] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors appearance-none";
    const labelClasses = "block text-gray-200 text-sm font-bold mb-2";

    return (
        <div className="min-h-[100dvh] flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md my-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white mb-2">
                        <span className="text-green-500 text-4xl mr-2">⚡</span>
                        FitTrack Pro
                    </h1>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Log in to continue your progress.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com" 
                            className={inputClasses} 
                            required 
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password" 
                            className={inputClasses} 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account? <Link to="/register" className="text-green-500 font-bold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
