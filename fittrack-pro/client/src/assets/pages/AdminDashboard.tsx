import React from 'react';

const AdminDashboard: React.FC = () => {
  // Mock Data to match the screenshot
  const stats = [
    { title: 'Total Members', value: '1,250', change: '+1.2%', isPositive: true, period: 'this month' },
    { title: 'Active Members', value: '980', change: '+0.8%', isPositive: true, period: 'this month' },
    { title: 'Recent Sign-ups', value: '15', change: '-5.0%', isPositive: false, period: 'vs last week' },
    { title: 'Outstanding Payments', value: '$1,500.00', sub: 'in 12 invoices' }
  ];

  const recentSignups = [
    { name: 'John Doe', joined: '2 days ago', plan: 'Premium Plan', img: 'https://ui-avatars.com/api/?name=John+Doe&background=random' },
    { name: 'Jane Smith', joined: '3 days ago', plan: 'Basic Plan', img: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random' },
    { name: 'Mike Johnson', joined: '5 days ago', plan: 'Premium Plan', img: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random' },
  ];

  const outstandingPayments = [
    { name: 'Emily Clark', overdue: '12 days', amount: '$120.00', img: 'https://ui-avatars.com/api/?name=Emily+Clark&background=random' },
    { name: 'Robert Brown', overdue: '8 days', amount: '$85.00', img: 'https://ui-avatars.com/api/?name=Robert+Brown&background=random' },
    { name: 'Sarah Wilson', overdue: '3 days', amount: '$120.00', img: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=random' },
  ];

  return (
    <div className="min-h-screen bg-[#0d1216] text-white p-6 md:p-8 font-sans">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg">
                <span className="text-black text-xl font-bold">⚡</span>
            </div>
            <div>
                <h1 className="text-xl font-bold">FitTrack Pro</h1>
                <span className="text-xs text-green-500 font-medium">ADMIN PANEL</span>
            </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96">
                <input 
                    type="text" 
                    placeholder="Search members, plans..." 
                    className="w-full bg-[#151f1b] border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-green-500 text-white"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="bg-[#151f1b] p-2 rounded-lg border border-gray-700 hover:text-green-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden border border-gray-500">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff" alt="Admin" />
            </div>
        </div>
      </header>

      {/* Title Section */}
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold">Dashboard Overview</h2>
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition">
              <span>+</span> Add New Member
          </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
              <div key={index} className="bg-[#151f1b] p-6 rounded-2xl border border-gray-800">
                  <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  
                  {stat.sub ? (
                      <div className="text-gray-400 text-sm">{stat.sub}</div>
                  ) : (
                      <div className="flex items-center text-sm">
                          <span className={stat.isPositive ? 'text-green-500' : 'text-red-500'}>
                              {stat.change}
                          </span>
                          <span className="text-gray-500 ml-2">{stat.period}</span>
                      </div>
                  )}
              </div>
          ))}
      </div>

      {/* Chart Section (Mock Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-[#151f1b] p-6 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Member Growth</h3>
                  <div className="flex gap-2">
                      <button className="text-xs bg-gray-800 px-3 py-1 rounded text-gray-300">30 Days</button>
                      <button className="text-xs bg-gray-700 px-3 py-1 rounded text-white">Last 90 Days</button>
                  </div>
              </div>
              {/* Mock Graph Visual */}
              <div className="h-64 flex items-end justify-between gap-1 px-4 relative z-10">
                  <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path d="M0 45 C 20 40, 40 45, 60 20 S 80 10, 100 5" stroke="#10b981" strokeWidth="0.5" fill="none" />
                      <defs>
                        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0 45 C 20 40, 40 45, 60 20 S 80 10, 100 5 V 50 H 0 Z" fill="url(#grad)" />
                  </svg>
              </div>
          </div>
          
          <div className="bg-[#10b981] rounded-2xl p-6 flex flex-col justify-center items-center text-center text-black">
                <h3 className="text-2xl font-bold mb-2">Pro Tip</h3>
                <p className="mb-4 text-sm font-medium opacity-80">Encourage members to track their progress daily to increase retention rates by 25%.</p>
                <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold">View Reports</button>
          </div>
      </div>

      {/* Bottom Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Signups */}
          <div className="bg-[#151f1b] p-6 rounded-2xl border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Sign-ups</h3>
                  <button className="text-green-500 text-sm font-bold">View All</button>
              </div>
              <div className="space-y-4">
                  {recentSignups.map((user, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                              <div>
                                  <div className="font-bold text-sm">{user.name}</div>
                                  <div className="text-gray-500 text-xs">Joined: {user.joined}</div>
                              </div>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-bold ${user.plan === 'Premium Plan' ? 'bg-green-500/20 text-green-500' : 'bg-gray-700 text-gray-300'}`}>
                              {user.plan}
                          </span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Outstanding Payments */}
          <div className="bg-[#151f1b] p-6 rounded-2xl border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Outstanding Payments</h3>
                  <button className="text-green-500 text-sm font-bold">View All</button>
              </div>
              <div className="space-y-4">
                  {outstandingPayments.map((user, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full" />
                              <div>
                                  <div className="font-bold text-sm">{user.name}</div>
                                  <div className="text-red-500 text-xs">Overdue by {user.overdue}</div>
                              </div>
                          </div>
                          <span className="font-bold text-white">
                              {user.amount}
                          </span>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
