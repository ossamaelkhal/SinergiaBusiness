import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase'; // Importa a instância do auth

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função de Cadastro
  function signup(email, password) {
    // Firebase já retorna uma promessa, então podemos retorná-la diretamente
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Função de Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Função de Logout
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup, // expõe a função de cadastro
    login,  // expõe a função de login
    logout, // expõe a função de logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
