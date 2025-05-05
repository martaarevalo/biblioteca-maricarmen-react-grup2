import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const darkModeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('darkMode='));
    if (darkModeCookie) {
      const value = darkModeCookie.split('=')[1] === 'true';
      setDarkMode(value);
      document.documentElement.classList.toggle('dark-mode', value);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
      document.documentElement.classList.toggle('dark-mode', prefersDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark-mode', newDarkMode);

    // Guardar la preferencia en las cookies
    document.cookie = `darkMode=${newDarkMode}; path=/; max-age=31536000`; // 1 año
  };

  return (
    <a href="#" className="dark-mode-toggle" onClick={(e) => { e.preventDefault(); toggleDarkMode(); }}>
      {darkMode ? '☽' : '☀'}
    </a>
  );
};

export default DarkModeToggle;