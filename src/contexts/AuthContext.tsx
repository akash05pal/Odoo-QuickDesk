import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { generateId } from '../utils/helpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('quickdesk_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('quickdesk_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('quickdesk_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, role: User['role']): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('quickdesk_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: User) => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: generateId(),
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('quickdesk_users', JSON.stringify(users));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickdesk_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};