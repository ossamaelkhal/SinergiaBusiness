import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Se não houver usuário logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se houver um usuário logado, renderize o componente filho
  return children;
};

export default ProtectedRoute;
