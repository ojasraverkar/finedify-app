// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Modules from './pages/Modules';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Import the guard
import QuizDashboard from './components/QuizDashboard';
import PortfolioTrading from './pages/PortfolioTrading';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/quiz" element={<QuizDashboard />} />
        <Route path="/portfolio-trading" element={<PortfolioTrading />} />
        
        {/* Protected Route */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;