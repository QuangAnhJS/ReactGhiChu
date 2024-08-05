import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo context
const AuthContext = createContext();

// Tạo provider
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(()=>{
  const token = localStorage.getItem('access_token');
  if(token){
    setIsAuthenticated(true);
  }
},[]);
const logout = () => {
  localStorage.clear();
  setIsAuthenticated(false);
};
    console.log('AuthContext value:', { isAuthenticated });

    return (
        <AuthContext.Provider value={{ isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// Tạo hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);
