// src/Theme/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import light from './light';
import dark from './dark';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // default
  const [themes, setTheme] = useState(light); // load light theme initially

  const changeTheme = (mode) => {
    setThemeMode(mode);
    setTheme(mode === 'dark' ? dark : light);
  };

  return (
    <ThemeContext.Provider value={{ themes, themeMode, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
