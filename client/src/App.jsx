import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Layouts
import ClientLayout from './layouts/ClientLayout';
import OrganizerLayout from './layouts/OrganizerLayout';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import EventDetail from './pages/EventDetail';
import Booking from './pages/Booking';
import Ticket from './pages/Ticket';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Routes>
        {/* Client Flow */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Client Routes */}
          <Route element={<ProtectedRoute requiredRole="client" />}>
            <Route path="/book/:id" element={<Booking />} />
            <Route path="/ticket/:id" element={<Ticket />} />
          </Route>
        </Route>

        {/* Organizer Flow (Protected) */}
        <Route path="/organizer" element={<ProtectedRoute requiredRole="organizer" />}>
          <Route element={<OrganizerLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<CreateEvent />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
