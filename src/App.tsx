import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

// Add some global styles
import './index.css';

function App() {
  return (
    <BudgetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </BudgetProvider>
  );
}

export default App;