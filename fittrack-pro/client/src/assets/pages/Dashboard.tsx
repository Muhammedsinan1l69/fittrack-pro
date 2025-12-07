import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
    _id: string;
    fullName: string;
    email: string;
    contactNumber: string;
    height: number;
    weight: number;
    bodyFat?: number;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ height: 0, weight: 0, bodyFat: 0 });
    const [successMsg, setSuccessMsg] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }

            try {
                const res = await axios.get(`${API_URL}/api/users/profile`, {
                    headers: { 'x-auth-token': token }
                });
                setUser(res.data);
                setEditForm({
                    height: res.data.height || 0,
                    weight: res.data.weight || 0,
                    bodyFat: res.data.bodyFat || 15.5 
                });
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate, API_URL]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${API_URL}/api/users/profile`, editForm, {
                headers: { 'x-auth-token': token }
            });
            setUser(res.data);
            setIsEditing(false);
            setSuccessMsg('Profile updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-[#0d1216] text-white flex items-center justify-center">Loading...</div>;

    const heightInM = editForm.height / 100;
    const bmi = heightInM > 0 ? (editForm.weight / (heightInM * heightInM)).toFixed(1) : 'N/A';

    return (
        <div className="min-h-screen bg-[#0d1216] p-4 md:p-8 font-sans text-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <span className="text-green-500 text-3xl font-bold">⚡ FitTrack Pro</span>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center">
                    <button className="text-green-500 font-bold border-b-2 border-green-500">Profile</button>
                    <button onClick={() => navigate('/workouts')} className="text-gray-300 hover:text-green-500 transition font-medium">Workouts</button>
                    <button onClick={() => navigate('/schedule')} className="text-gray-300 hover:text-green-500 transition font-medium">Classes</button>
                    <button onClick={() => navigate('/plans')} className="text-gray-300 hover:text-green-500 transition font-medium">Plans</button>
                    <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded hover:bg-red-500/20 transition text-sm font-bold ml-2">Logout</button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-gray-400 mb-8">Manage your personal information and track your physical metrics.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#151f1b] p-6 rounded-2xl border border-gray-800 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-700 rounded-full mb-4 overflow-hidden border-2 border-green-500">
                             <img src={`https://ui-avatars.com/api/?name=${user.fullName}&background=10b981&color=fff`} alt="Avatar" className="w-full h-full object-cover"/>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                        <p className="text-gray-400 text-sm">Member ID: FT{user._id.slice(-6).toUpperCase()}</p>
                        <div className="mt-2 px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-bold">Gold Member - Active</div>
                        
                        <div className="w-full mt-8 border-t border-gray-800 pt-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400 text-sm">Email</span>
                                <span className="text-white text-sm">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Phone</span>
                                <span className="text-white text-sm">{user.contactNumber}</span>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-[#151f1b] p-6 rounded-2xl border border-gray-800 relative">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Physical Metrics</h3>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${isEditing ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                            >
                                {isEditing ? 'Save Changes' : '✏️ Edit'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#0f1715] p-4 rounded-xl border border-gray-800">
                                <label className="text-gray-400 text-xs mb-1 block">Height</label>
                                <div className="flex items-center justify-between">
                                    {isEditing ? (
                                        <input 
                                            type="number" 
                                            value={editForm.height} 
                                            onChange={(e) => setEditForm({...editForm, height: Number(e.target.value)})}
                                            className="bg-transparent text-white font-bold text-xl w-full focus:outline-none border-b border-green-500"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-xl">{user.height}</span>
                                    )}
                                    <span className="text-gray-500 text-sm">cm</span>
                                </div>
                            </div>

                            <div className="bg-[#0f1715] p-4 rounded-xl border border-gray-800">
                                <label className="text-gray-400 text-xs mb-1 block">Weight</label>
                                <div className="flex items-center justify-between">
                                    {isEditing ? (
                                        <input 
                                            type="number" 
                                            value={editForm.weight} 
                                            onChange={(e) => setEditForm({...editForm, weight: Number(e.target.value)})}
                                            className="bg-transparent text-white font-bold text-xl w-full focus:outline-none border-b border-green-500"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-xl">{user.weight}</span>
                                    )}
                                    <span className="text-gray-500 text-sm">kg</span>
                                </div>
                            </div>

                             <div className="bg-[#0f1715] p-4 rounded-xl border border-gray-800">
                                <label className="text-gray-400 text-xs mb-1 block">Body Fat %</label>
                                <div className="flex items-center justify-between">
                                     {isEditing ? (
                                        <input 
                                            type="number" 
                                            value={editForm.bodyFat} 
                                            onChange={(e) => setEditForm({...editForm, bodyFat: Number(e.target.value)})}
                                            className="bg-transparent text-white font-bold text-xl w-full focus:outline-none border-b border-green-500"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-xl">{editForm.bodyFat}</span>
                                    )}
                                    <span className="text-gray-500 text-sm">%</span>
                                </div>
                            </div>

                             <div className="bg-[#0f1715] p-4 rounded-xl border border-gray-800">
                                <label className="text-gray-400 text-xs mb-1 block">BMI</label>
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-bold text-xl">{bmi}</span>
                                    <span className="text-gray-500 text-sm">(Calculated)</span>
                                </div>
                            </div>
                        </div>

                        {successMsg && (
                            <div className="mt-6 bg-green-500/20 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg flex items-center animate-pulse">
                                <span className="mr-2">✓</span> {successMsg}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;