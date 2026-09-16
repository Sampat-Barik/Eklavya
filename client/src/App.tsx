import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Import Pages
import { Home } from './pages/Home';
import { Vision } from './pages/Vision';
import { Faculty } from './pages/Faculty';
import { Members } from './pages/Members';
import { Alumni } from './pages/Alumni';
import { Events } from './pages/Events';
import { Donate } from './pages/Donate';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900 flex flex-col justify-between">
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/about" element={<Vision />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/members" element={<Members />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Catch-all 404 Page */}
          <Route
            path="*"
            element={
              <div className="text-center py-32 space-y-4">
                <h1 className="text-5xl font-extrabold text-white">404</h1>
                <p className="text-slate-400 text-lg">Page Not Found</p>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
