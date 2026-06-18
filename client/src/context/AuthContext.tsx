import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our user state
// This helps TypeScript understand what properties exist on a user object
interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Define the shape of our Auth context
interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the context with a null default value
// This will be used by components to access the auth state
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component that will wrap our application
// It holds the actual state and provides it to all children
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // When the app first loads, check if we have a saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Function to handle login
  const login = (userData: User, token: string) => {
    setUser(userData);
    // Save token and user details to localStorage to persist login across reloads
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Context value that will be provided to consumers
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to easily use the auth context in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
