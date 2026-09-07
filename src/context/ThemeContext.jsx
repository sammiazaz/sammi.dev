import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  siteTheme: 'ilian',
  colorMode: 'dark',
  toggleSiteTheme: () => {},
  toggleColorMode: () => {},
  setSiteTheme: () => {},
  setColorMode: () => {},
});

export function ThemeProvider({ children }) {
  const [siteTheme, setSiteTheme] = useState(() => {
    // New theme ('ilian') is the primary default
    const savedV2 = localStorage.getItem('site_theme_v2');
    if (savedV2) {
      return savedV2;
    }
    // Migrate or default to 'ilian'
    localStorage.setItem('site_theme', 'ilian');
    localStorage.setItem('site_theme_v2', 'ilian');
    return 'ilian';
  });

  const [colorMode, setColorMode] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Sync site theme (ilian vs sammi)
  useEffect(() => {
    document.documentElement.setAttribute('data-site-theme', siteTheme);
    localStorage.setItem('site_theme', siteTheme);
    localStorage.setItem('site_theme_v2', siteTheme);
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
