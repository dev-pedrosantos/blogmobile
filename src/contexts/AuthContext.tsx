import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '../services/mockData';
import { login as apiLogin } from '../services/api';

interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isProfessor: boolean;
  isAluno: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, senha: string): Promise<boolean> => {
    setLoading(true);
    try {
      const usuarioLogado = await apiLogin(email, senha);
      if (usuarioLogado) {
        setUsuario(usuarioLogado);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUsuario(null);
  };

  const value: AuthContextType = {
    usuario,
    loading,
    login,
    logout,
    isAuthenticated: !!usuario,
    isProfessor: usuario?.tipo === 'professor',
    isAluno: usuario?.tipo === 'aluno',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
