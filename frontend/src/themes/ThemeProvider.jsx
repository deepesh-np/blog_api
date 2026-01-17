/** @format */

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    const saved = localStorage.getItem('theme');
    const theme = saved || 'light';
    // Set immediately on init
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    document.body.setAttribute('data-theme', theme);
    return theme;
  });

  useEffect(() => {
    console.log('[ThemeProvider] Theme changed to:', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
    document.documentElement.style.colorScheme = themeName;
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
    console.log(
      '[ThemeProvider] data-theme on html:',
      document.documentElement.getAttribute('data-theme')
    );
    console.log(
      '[ThemeProvider] data-theme on body:',
      document.body.getAttribute('data-theme')
    );
  }, [themeName]);

  const toggleTheme = () => {
    console.log('[ToggleTheme] Called, current theme:', themeName);
    setThemeName((t) => {
      const newTheme = t === 'light' ? 'dark' : 'light';
      console.log('[ToggleTheme] Switching to:', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
