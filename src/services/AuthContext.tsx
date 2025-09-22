import { createContext, useContext, useEffect, useState } from 'react';
import { authService, userService } from './auth';

interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    userService.get().then(setUserId);
  }, []);

  const logout = () => {
    authService.clear();
    userService.clear();
    setUserId(null);
  };

  const isAuthenticated = !!userId;

  return (
    <AuthContext.Provider value={{ userId, setUserId, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};