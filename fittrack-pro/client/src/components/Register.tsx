import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: 'Male',
        contactNumber: ''
    });

    // Use environment variable
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Updated URL
            await axios.post(`${API_URL}/api/users/register`, formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || 'Error registering';
            alert(message);
        }
    };

    const inputClasses = "w-full bg-[#1c2a26] border border-[#2d403a] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors";
    const labelClasses = "block text-gray-200 text-sm font-bold mb-2";

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-white mb-2">
                        <span className="text-green-500 text-4xl mr-2">⚡</span>
                        FitTrack Pro
                    </h1>
                    <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Get instant access to class schedules, personal training, and more.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={labelClasses}>Full Name</label>
                        <input type="text" name="fullName" placeholder="Enter your full name" className={inputClasses} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className={labelClasses}>Email Address</label>
                        <input type="email" name="email" placeholder="you@example.com" className={inputClasses} onChange={handleChange} required />
                    </div>

                    <div>
                        <label className={labelClasses}>Password</label>
                        <input type="password" name="password" placeholder="Enter a strong password" className={inputClasses} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Date of Birth</label>
                            <input type="date" name="dateOfBirth" className={inputClasses} onChange={handleChange} required />
                        </div>
                        <div>
                            <label className={labelClasses}>Gender</label>
                            <select name="gender" className={inputClasses} onChange={handleChange} value={formData.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Contact Number</label>
                        <input type="text" name="contactNumber" placeholder="+1 (555) 000-0000" className={inputClasses} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors mt-6">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already a member? <Link to="/login" className="text-green-500 font-bold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;