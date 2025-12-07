import React from 'react';
import { useNavigate } from 'react-router-dom';

const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0d1216] text-white p-4 md:p-8 font-sans">
        {/* --- CONSISTENT HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <span className="text-green-500 text-3xl font-bold">⚡ FitTrack Pro</span>
            </div>
            <div className="flex gap-6 items-center">
                <button onClick={() => navigate('/schedule')} className="text-gray-300 hover:text-green-500 transition font-medium">Classes</button>
                <button className="text-green-500 font-bold border-b-2 border-green-500">Plans</button>
                <button onClick={() => navigate('/dashboard')} className="text-gray-300 hover:text-green-500 transition font-medium">Profile</button>
                <button onClick={handleLogout} className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded hover:bg-red-500/20 transition text-sm font-bold ml-2">Logout</button>
            </div>
        </div>

        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold mb-10 text-center">Choose the Plan That's Right For You</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
                
                {/* Standard Plan */}
                <div className="bg-[#151f1b] border border-gray-700 rounded-2xl p-8 flex flex-col hover:border-gray-500 transition">
                    <h2 className="text-xl font-bold mb-2">Standard Membership</h2>
                    <div className="mb-6">
                        <span className="text-5xl font-extrabold text-white">₹600</span>
                        <span className="text-gray-400 ml-2">per month</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        {['Access to all gym facilities', 'Standard equipment usage', 'Locker room access'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="bg-green-500 rounded-full p-1">
                                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-[#2d3834] text-gray-300 hover:bg-gray-700 transition font-bold">Select Standard</button>
                </div>

                {/* Plus Plan */}
                <div className="bg-[#151f1b] border border-green-500 rounded-2xl p-8 flex flex-col relative overflow-hidden transform md:scale-105 shadow-2xl shadow-green-900/20">
                    <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">Most Popular</div>
                    
                    <h2 className="text-xl font-bold mb-2">Plus Membership</h2>
                    <div className="mb-6">
                        <span className="text-5xl font-extrabold text-white">$49</span>
                        <span className="text-gray-400 ml-2">per month</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        {['All Standard features', 'Personalized diet plans', 'Access to group classes', 'Monthly progress tracking'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="bg-green-500 rounded-full p-1">
                                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-green-500 text-black hover:bg-green-400 transition font-bold">Select Plus</button>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 max-w-3xl w-full">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    <div className="border-b border-gray-800 pb-4">
                        <div className="flex justify-between items-center cursor-pointer">
                            <span className="font-semibold">Can I cancel anytime?</span>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                        </div>
                        <p className="text-green-500/80 text-sm mt-2">Yes, you can cancel your membership at any time through your account settings.</p>
                    </div>
                     {/* Mock FAQs */}
                     {['What payment methods are accepted?', 'How do I get my diet plan?'].map((q, i) => (
                         <div key={i} className="border-b border-gray-800 pb-4 flex justify-between items-center cursor-pointer">
                            <span className="font-semibold">{q}</span>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Plans;