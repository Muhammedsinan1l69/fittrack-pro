import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Plans from './components/Plans';
import Dashboard from './assets/pages/Dashboard';
import AdminDashboard from './assets/pages/AdminDashboard';
import Schedule from './assets/pages/Schedule'; // <--- IMPORT THIS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/plans" element={<Plans />} />
        
        {/* NEW ROUTE */}
        <Route path="/schedule" element={<Schedule />} /> 
      </Routes>
    </Router>
  );
}

export default App;