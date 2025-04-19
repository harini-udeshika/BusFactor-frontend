import React, { createContext, useState, useEffect, useContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(() => {
    // Retrieve data from sessionStorage on initial load
    const storedData = localStorage.getItem('globalData');
    return storedData ? JSON.parse(storedData) : {};
  });

  const [documentationData, setDocumentationData] = useState(() => {
    const storedDocs = localStorage.getItem("documentationData");
    return storedDocs ? JSON.parse(storedDocs) : {};
  });

  const [completedTasksData, setCompletedTasksData] = useState(() => {
    const storedDocs = localStorage.getItem("completedTasksData");
    return storedDocs ? JSON.parse(storedDocs) : {};
  });

  // Save globalData to sessionStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('globalData', JSON.stringify(globalData));
  }, [globalData]);

  useEffect(() => {
    localStorage.setItem("documentationData", JSON.stringify(documentationData));
  }, [documentationData]);

  useEffect(() => {
    localStorage.setItem("completedTasksData", JSON.stringify(completedTasksData));
  }, [completedTasksData]);
  
  return (
    <GlobalContext.Provider value={{
      globalData, setGlobalData, documentationData,
      setDocumentationData,completedTasksData, setCompletedTasksData
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useMyContext = () => useContext(GlobalContext);
