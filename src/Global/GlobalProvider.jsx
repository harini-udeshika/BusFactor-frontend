import React, { createContext, useState, useEffect, useContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(() => {
    // Retrieve data from sessionStorage on initial load
    const storedData = localStorage.getItem('globalData');
    return storedData ? JSON.parse(storedData) : {};
  });

  // Save globalData to sessionStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('globalData', JSON.stringify(globalData));
  }, [globalData]);

  return (
    <GlobalContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useMyContext = () => useContext(GlobalContext);
