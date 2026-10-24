import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Demo-only authentication: no backend and no persistent storage.
  const login = async (email, password) => {
    if (!email.trim() || !password.trim()) throw new Error('Please enter your email and password.');
    setUser({ email: email.trim() });
    return { email: email.trim() };
  };

  const signup = async (name, email, password) => {
    if (!name.trim() || !email.trim() || !password.trim()) throw new Error('Please fill in all fields.');
    if (password.length < 4) throw new Error('Password must contain at least 4 characters.');
    setUser({ name: name.trim(), email: email.trim() });
    return { name: name.trim(), email: email.trim() };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
