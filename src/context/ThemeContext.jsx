import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  siteTheme: 'sammi',
  colorMode: 'dark',
  toggleSiteTheme: () => {},
  toggleColorMode: () => {},
  setSiteTheme: () => {},
  setColorMode: () => {},
});

export function ThemeProvider({ children }) {
  const [siteTheme, setSiteTheme] = useState(() => {
    return localStorage.getItem('site_theme') || 'sammi';
  });

  const [colorMode, setColorMode] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Sync site theme (sammi vs ilian)
  useEffect(() => {
    document.documentElement.setAttribute('data-site-theme', siteTheme);
    localStorage.setItem('site_theme', siteTheme);
  }, [siteTheme]);

  // Sync color mode (dark vs light)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
    localStorage.setItem('theme', colorMode);
  }, [colorMode]);

  const toggleSiteTheme = () => {
    setSiteTheme((prev) => (prev === 'sammi' ? 'ilian' : 'sammi'));
  };

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        siteTheme,
        colorMode,
        toggleSiteTheme,
        toggleColorMode,
        setSiteTheme,
        setColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
