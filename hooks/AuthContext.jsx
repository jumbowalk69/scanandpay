import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    // You might want to perform additional tasks upon successful login (e.g., store token)
  };

  const logout = () => {
    setIsLoggedIn(false);
    // You might want to clear stored tokens or perform cleanup tasks upon logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
