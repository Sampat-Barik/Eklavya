import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUser: string | User, passwordOrToken?: string) => Promise<void> | void;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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

  const login = async (emailOrUser: string | User, passwordOrToken?: string) => {
    if (typeof emailOrUser === 'object') {
      setUser(emailOrUser);
      if (passwordOrToken) localStorage.setItem('token', passwordOrToken);
      localStorage.setItem('user', JSON.stringify(emailOrUser));
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUser, password: passwordOrToken }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return;
      }
    } catch (e) {
      console.warn("Backend auth offline, using local fallback");
    }

    // Fallback demo user login
    const demoUser: User = {
      id: 'demo-1',
      name: emailOrUser.split('@')[0] || 'Demo User',
      email: emailOrUser,
      isAdmin: emailOrUser.includes('admin'),
    };
    setUser(demoUser);
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  const register = async (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      isAdmin: false,
    };
    setUser(newUser);
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
