import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WorkoutLog {
    id: number;
    date: string;
    exercise: string;
    weight: number;
    reps: number;
    sets: number;
}

const Workouts: React.FC = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<WorkoutLog[]>([
        { id: 1, date: '2023-10-24', exercise: 'Bench Press', weight: 60, reps: 10, sets: 3 },
        { id: 2, date: '2023-10-24', exercise: 'Squats', weight: 80, reps: 8, sets: 4 },
        { id: 3, date: '2023-10-22', exercise: 'Deadlift', weight: 100, reps: 5, sets: 3 },
    ]);

    const [newLog, setNewLog] = useState({
        exercise: '',
        weight: '',
        reps: '',
        sets: ''
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleAddLog = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newLog.exercise || !newLog.weight || !newLog.reps || !newLog.sets) return;

        const logItem: WorkoutLog = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            exercise: newLog.exercise,
            weight: Number(newLog.weight),
            reps: Number(newLog.reps),
            sets: Number(newLog.sets)
        };

        setLogs([logItem, ...logs]);
        setNewLog({ exercise: '', weight: '', reps: '', sets: '' });
    };

    const inputClass = "bg-[#1c2a26] border border-[#2d403a] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 w-full";

    return (
        <div className="min-h-screen bg-[#0d1216] p-4 md:p-8 font-sans text-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <span className="text-green-500 text-3xl font-bold">⚡ FitTrack Pro</span>
                </div>
                <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center">
                    <button onClick={() => navigate('/dashboard')} className="text-gray-300 hover:text-green-500 transition font-medium">Profile</button>
                    <button className="text-green-500 font-bold border-b-2 border-green-500">Workouts</button>
                    <button onClick={() => navigate('/schedule')} className="text-gray-300 hover:text-green-500 transition font-medium">Classes</button>
                    <button onClick={() => navigate('/plans')} className="text-gray-300 hover:text-green-500 transition font-medium">Plans</button>
                    <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded hover:bg-red-500/20 transition text-sm font-bold ml-2">Logout</button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-[#151f1b] p-6 rounded-2xl border border-gray-800 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Log Set</h2>
                            <form onSubmit={handleAddLog} className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Exercise Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Bench Press" 
                                        className={inputClass}
                                        value={newLog.exercise}
                                        onChange={e => setNewLog({...newLog, exercise: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Weight (kg)</label>
                                        <input 
                                            type="number" 
                                            placeholder="0" 
                                            className={inputClass}
                                            value={newLog.weight}
                                            onChange={e => setNewLog({...newLog, weight: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Reps</label>
                                        <input 
                                            type="number" 
                                            placeholder="0" 
                                            className={inputClass}
                                            value={newLog.reps}
                                            onChange={e => setNewLog({...newLog, reps: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 block mb-1">Sets</label>
                                        <input 
                                            type="number" 
                                            placeholder="0" 
                                            className={inputClass}
                                            value={newLog.sets}
                                            onChange={e => setNewLog({...newLog, sets: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg transition-colors">
                                    + Add Entry
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Recent History</h2>
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div key={log.id} className="bg-[#1c2a26] p-4 rounded-xl border border-[#2d403a] flex justify-between items-center">
                                    <div>
                                        <div className="text-xs text-green-500 font-bold mb-1">{log.date}</div>
                                        <h3 className="text-lg font-bold text-white">{log.exercise}</h3>
                                    </div>
                                    <div className="flex gap-6 text-center">
                                        <div>
                                            <div className="text-xl font-bold text-white">{log.weight}</div>
                                            <div className="text-[10px] text-gray-400 uppercase">kg</div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">{log.reps}</div>
                                            <div className="text-[10px] text-gray-400 uppercase">Reps</div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">{log.sets}</div>
                                            <div className="text-[10px] text-gray-400 uppercase">Sets</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="text-gray-500 text-center py-10">No workouts logged yet. Start training!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workouts;
