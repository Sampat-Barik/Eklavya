import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

// Import Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Members } from './pages/Members';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Navbar stays at the top of every page */}
      <Navbar />

      {/* Main content area */}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/members" element={<Members />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - require login */}
          <Route element={<ProtectedRoute />}>
            {/* We could add standard user protected routes here, like a profile page */}
          </Route>

          {/* Admin Protected Routes - require login AND isAdmin = true */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all for 404 pages */}
          <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
