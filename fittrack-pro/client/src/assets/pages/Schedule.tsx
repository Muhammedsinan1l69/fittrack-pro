import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
type ActivityType = 'Gym' | 'Cardio' | 'Zumba' | 'Yoga';

interface Session {
    id: number;
    time: string;
    title: string;
    trainer: string;
    type: ActivityType;
    duration: string;
    exercises: string[]; 
}

interface DaySchedule {
    day: string;
    sessions: Session[];
}

// Mock Data
const weeklyData: DaySchedule[] = [
    {
        day: 'Monday',
        sessions: [
            { 
                id: 1, time: '07:00 AM', title: 'Morning HIIT', trainer: 'John D.', type: 'Cardio', duration: '45 min',
                exercises: ['High Knees - 3 sets', 'Burpees - 3 sets', 'Mountain Climbers - 3 sets', 'Jump Rope - 10 mins']
            },
            { 
                id: 2, time: '05:00 PM', title: 'Chest & Triceps', trainer: 'Mike T.', type: 'Gym', duration: '60 min',
                exercises: ['Barbell Bench Press - 4x10', 'Incline Dumbbell Press - 3x12', 'Cable Flys - 3x15', 'Tricep Dips - 3xFailure', 'Skull Crushers - 3x12']
            },
            { 
                id: 3, time: '07:00 PM', title: 'Zumba Dance', trainer: 'Sarah L.', type: 'Zumba', duration: '60 min',
                exercises: ['Salsa Warm-up', 'Merengue Hips', 'Reggaeton Bounce', 'Cumbia Step', 'Cool Down Stretch']
            }
        ]
    },
    {
        day: 'Tuesday',
        sessions: [
            { 
                id: 4, time: '08:00 AM', title: 'Power Yoga', trainer: 'Emma W.', type: 'Yoga', duration: '60 min',
                exercises: ['Sun Salutation A', 'Warrior I & II', 'Triangle Pose', 'Crow Pose Practice', 'Savasana']
            },
            { 
                id: 5, time: '06:00 PM', title: 'Back & Biceps', trainer: 'Mike T.', type: 'Gym', duration: '60 min',
                exercises: ['Deadlifts - 4x8', 'Lat Pulldowns - 3x12', 'Seated Row - 3x12', 'Barbell Curls - 3x10', 'Hammer Curls - 3x12']
            }
        ]
    },
    {
        day: 'Wednesday',
        sessions: [
            { 
                id: 6, time: '07:00 AM', title: 'Spin Class', trainer: 'John D.', type: 'Cardio', duration: '45 min',
                exercises: ['Warm-up Ride', 'Hill Climb Intervals', 'Sprints (30s on/30s off)', 'Endurance Pace', 'Cool Down']
            },
            { 
                id: 7, time: '06:30 PM', title: 'Zumba Fusion', trainer: 'Sarah L.', type: 'Zumba', duration: '60 min',
                exercises: ['Hip-Hop Intro', 'Bollywood Beats', 'Latin Mix', 'Belly Dance Isolation', 'Partner Step']
            }
        ]
    },
    {
        day: 'Thursday',
        sessions: [
            { 
                id: 8, time: '05:00 PM', title: 'Leg Day', trainer: 'Mike T.', type: 'Gym', duration: '75 min',
                exercises: ['Barbell Squats - 5x5', 'Leg Press - 3x12', 'Romanian Deadlifts - 3x10', 'Leg Extensions - 3x15', 'Calf Raises - 4x20']
            },
            { 
                id: 9, time: '07:00 PM', title: 'Restorative Yoga', trainer: 'Emma W.', type: 'Yoga', duration: '60 min',
                exercises: ['Child\'s Pose', 'Cat-Cow Stretch', 'Pigeon Pose', 'Seated Forward Fold', 'Deep Breathing']
            }
        ]
    },
    {
        day: 'Friday',
        sessions: [
            { 
                id: 10, time: '07:00 AM', title: 'Full Body Circuit', trainer: 'John D.', type: 'Cardio', duration: '50 min',
                exercises: ['Box Jumps', 'Kettlebell Swings', 'Battle Ropes', 'Plank Hold (2 min)', 'Wall Balls']
            },
            { 
                id: 11, time: '06:00 PM', title: 'Shoulders & Abs', trainer: 'Mike T.', type: 'Gym', duration: '60 min',
                exercises: ['Overhead Press - 4x10', 'Lateral Raises - 3x15', 'Face Pulls - 3x12', 'Hanging Leg Raises - 3x15', 'Cable Crunches - 3x20']
            }
        ]
    },
    {
        day: 'Saturday',
        sessions: [
            { 
                id: 12, time: '09:00 AM', title: 'CrossFit Challenge', trainer: 'Alex R.', type: 'Gym', duration: '90 min',
                exercises: ['1 Mile Run', '100 Pull-ups', '200 Push-ups', '300 Squats', '1 Mile Run']
            }
        ]
    },
    {
        day: 'Sunday',
        sessions: [
            { 
                id: 13, time: '10:00 AM', title: 'Rest & Recovery', trainer: 'Self', type: 'Yoga', duration: '30 min',
                exercises: ['Light Stretching', 'Foam Rolling', 'Meditation', 'Hydration Focus']
            }
        ]
    }
];

const Schedule: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<ActivityType | 'All'>('All');
    const [selectedDay, setSelectedDay] = useState<DaySchedule | null>(null);

    const getTypeColor = (type: ActivityType) => {
        switch (type) {
            case 'Gym': return 'bg-blue-500 text-black';
            case 'Cardio': return 'bg-orange-500 text-black';
            case 'Zumba': return 'bg-pink-500 text-black';
            case 'Yoga': return 'bg-purple-500 text-white';
            default: return 'bg-gray-500';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0d1216] p-4 md:p-8 font-sans text-white">
            {/* --- CONSISTENT HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <span className="text-green-500 text-3xl font-bold">⚡ FitTrack Pro</span>
                </div>
                <div className="flex gap-6 items-center">
                    <button className="text-green-500 font-bold border-b-2 border-green-500">Classes</button>
                    <button onClick={() => navigate('/plans')} className="text-gray-300 hover:text-green-500 transition font-medium">Plans</button>
                    <button onClick={() => navigate('/dashboard')} className="text-gray-300 hover:text-green-500 transition font-medium">Profile</button>
                    <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded hover:bg-red-500/20 transition text-sm font-bold ml-2">Logout</button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {!selectedDay ? (
                    <>
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-extrabold mb-4">Weekly Class Schedule</h1>
                            <p className="text-gray-400">Select a day to view specific exercises and routines.</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mb-10">
                            {['All', 'Gym', 'Cardio', 'Zumba', 'Yoga'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat as ActivityType | 'All')}
                                    className={`px-6 py-2 rounded-full font-bold transition-all ${
                                        filter === cat 
                                        ? 'bg-green-500 text-black scale-105' 
                                        : 'bg-[#151f1b] border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-500'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {weeklyData.map((dayData) => {
                                const filteredSessions = dayData.sessions.filter(s => filter === 'All' || s.type === filter);
                                if (filteredSessions.length === 0) return null;

                                return (
                                    <div 
                                        key={dayData.day} 
                                        onClick={() => setSelectedDay(dayData)}
                                        className="bg-[#151f1b] border border-gray-800 rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 group"
                                    >
                                        <div className="bg-[#1c2a26] p-4 border-b border-gray-800 flex justify-between items-center">
                                            <h3 className="text-xl font-bold text-green-500">{dayData.day}</h3>
                                            <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded group-hover:bg-green-500 group-hover:text-black transition">View Plan</span>
                                        </div>
                                        
                                        <div className="p-4 space-y-4 flex-1">
                                            {filteredSessions.map((session) => (
                                                <div key={session.id} className="bg-[#0d1216] p-3 rounded-lg border border-gray-800">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getTypeColor(session.type)}`}>
                                                            {session.type}
                                                        </span>
                                                        <span className="text-gray-400 text-xs">{session.duration}</span>
                                                    </div>
                                                    <h4 className="font-bold text-lg leading-tight mb-1">{session.title}</h4>
                                                    <div className="text-xs text-gray-500">
                                                        {session.exercises.length} exercises
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="animate-fade-in-up">
                        <button 
                            onClick={() => setSelectedDay(null)} 
                            className="mb-6 flex items-center text-gray-400 hover:text-green-500 transition font-bold"
                        >
                            ← Back to Schedule
                        </button>

                        <div className="bg-[#151f1b] border border-green-500/30 rounded-3xl p-8">
                            <h2 className="text-4xl font-extrabold mb-2 text-white">{selectedDay.day} <span className="text-green-500">Workout Plan</span></h2>
                            <p className="text-gray-400 mb-8">Detailed breakdown of exercises for today.</p>

                            <div className="grid gap-8">
                                {selectedDay.sessions.map((session) => (
                                    <div key={session.id} className="bg-[#0d1216] rounded-xl p-6 border border-gray-800">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-700 pb-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${getTypeColor(session.type)}`}>
                                                        {session.type}
                                                    </span>
                                                    <span className="text-gray-400 font-mono text-sm">{session.time} ({session.duration})</span>
                                                </div>
                                                <h3 className="text-2xl font-bold">{session.title}</h3>
                                                <p className="text-sm text-gray-400">Trainer: {session.trainer}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-green-500 font-bold mb-3 uppercase text-xs tracking-widest">Exercise Routine</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {session.exercises.map((exercise, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 bg-[#1c2a26] p-3 rounded-lg border border-[#2d403a]">
                                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black text-xs font-bold">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="text-gray-200 font-medium">{exercise}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Schedule;