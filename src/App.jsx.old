import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage'; // Importa a nova página
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={currentUser ? <Navigate to="/dashboard" /> : <LandingPage />}
      />
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route 
        path="/signup" 
        element={currentUser ? <Navigate to="/dashboard" /> : <SignUpPage />}
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/company/:companyId" // Adiciona a rota de detalhes da empresa
        element={
          <ProtectedRoute>
            <CompanyDetailsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
