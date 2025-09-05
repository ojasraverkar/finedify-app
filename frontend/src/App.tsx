import React, { useState } from 'react';

// Import all the pages your app will show
import Index from './pages/Index'; // Your landing page
import LoginPage from './pages/LoginPage'; // Your login page
import Dashboard from './pages/Dashboard';

function App() {
  // This state now tracks which view is active
  const [view, setView] = useState('landing'); // Start with the 'landing' view

  const demoUser = { username: 'Ojas' };

  // This will be called from the landing page to go straight to the dashboard
  const handleEnterDashboard = () => setView('dashboard');

  // This is called from the dashboard header to go back to the landing page
  const handleLogout = () => setView('landing');

  // Logic to render the correct page
  if (view === 'landing') {
    return <Index onEnterDashboard={handleEnterDashboard} />;
  }

  // NOTE: The LoginPage is now bypassed, but we leave the code here for the future.
  if (view === 'login') {
    return <LoginPage onLogin={handleEnterDashboard} />;
  }

  if (view === 'dashboard') {
    return <Dashboard username={demoUser.username} onLogout={handleLogout} />;
  }
}

export default App;