import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import PGList from './pages/PGList';
import HostelList from './pages/HostelList';

import PropertyDetails from './pages/PropertyDetails';

import BookingPage from './pages/BookingPage';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pg" element={<PGList />} />
          <Route path="/pg/:id" element={<ProtectedRoute><PropertyDetails type="PG" /></ProtectedRoute>} />
          <Route path="/hostels" element={<HostelList />} />
          <Route path="/hostels/:id" element={<ProtectedRoute><PropertyDetails type="Hostel" /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute roles={['owner', 'admin']}><OwnerDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
