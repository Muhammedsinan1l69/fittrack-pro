import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Plans from './components/Plans';
import Dashboard from './assets/pages/Dashboard';
import AdminDashboard from './assets/pages/AdminDashboard';
import Schedule from './assets/pages/Schedule';
import Workouts from './assets/pages/Workouts';

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
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Router>
  );
}

export default App;