// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { lightTheme } from '../Themes/light';
// import { darkTheme } from '../Themes/dark';
// const ThemeContext = createContext();
// const STORAGE_KEY = 'APP_THEME';

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadTheme = async () => {
//       try {
//         const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
//         if (storedTheme === 'dark') setIsDark(true);
//       } catch (e) {
//         console.log('Failed to load theme', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTheme();
//   }, []);

//   const toggleTheme = async () => {
//     try {
//       const newValue = !isDark;
//       setIsDark(newValue);
//       await AsyncStorage.setItem(STORAGE_KEY, newValue ? 'dark' : 'light');
//     } catch (e) {
//       console.log('Failed to toggle theme', e);
//     }
//   };

//   const theme = isDark ? darkTheme : lightTheme;

//   if (loading) return null; 

//   return (
//     <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../Themes/themes";

const ThemeContext = createContext();
const STORAGE_THEME = "APP_MAIN_THEME";   
const STORAGE_MODE = "APP_THEME_MODE";   
export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState("freshMint");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(STORAGE_THEME);
      const savedMode = await AsyncStorage.getItem(STORAGE_MODE);

      if (savedTheme && themes[savedTheme]) setSelectedTheme(savedTheme);
      if (savedMode === "dark") setIsDark(true);
    };

    loadTheme();
  }, []);

  // Toggle Dark/Light
  const toggleThemeMode = async () => {
    const newMode = !isDark;
    setIsDark(newMode);
    await AsyncStorage.setItem(STORAGE_MODE, newMode ? "dark" : "light");
  };

  // Change Main Theme (freshMint → redTheme etc)
  const changeTheme = async (themeName) => {
    if (!themes[themeName]) return;
    setSelectedTheme(themeName);
    await AsyncStorage.setItem(STORAGE_THEME, themeName);
  };

  // Final Theme
  const theme = themes[selectedTheme][isDark ? "dark" : "light"];

  return (
    <ThemeContext.Provider value={{
      theme,
      selectedTheme,
      isDark,
      toggleThemeMode,
      changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
