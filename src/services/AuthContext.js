import React, { createContext, useState, useEffect } from "react";
import Parse from "parse";
import { initializeParse } from "./parseConfig"; // Adjust the path as needed

initializeParse();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLetter, setInitialLetter] = useState(null);

  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      setCurrentUser(user);
      // Safeguard to ensure we have a valid username or email
      const username = user.get("username") || "";
      const email = user.get("email") || "";
      const initial = username[0] || email[0] || "";
      setInitialLetter(initial.toUpperCase());
    }
  }, []);

  const login = async (email, password) => {
    try {
      const user = await Parse.User.logIn(email, password);
      setCurrentUser(user);
      // Safeguard to ensure we have a valid username or email
      const username = user.get("username") || "";
      const email = user.get("email") || "";
      const initial = username[0] || email[0] || "";
      setInitialLetter(initial.toUpperCase());
      return user;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Parse.User.logOut();
      setCurrentUser(null);
      setInitialLetter(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, initialLetter, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
