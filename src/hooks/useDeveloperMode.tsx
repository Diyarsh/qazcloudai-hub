import { useState, useEffect } from 'react';

export const useDeveloperMode = () => {
  const [isDeveloperMode, setIsDeveloperMode] = useState(() => {
    const saved = localStorage.getItem('developerMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('developerMode', JSON.stringify(isDeveloperMode));
  }, [isDeveloperMode]);

  const toggleDeveloperMode = () => {
    setIsDeveloperMode(!isDeveloperMode);
  };

  return {
    isDeveloperMode,
    toggleDeveloperMode,
  };
};