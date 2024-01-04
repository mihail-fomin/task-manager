'use client'
import React, {createContext, useState, useContext } from 'react'
import themes from './themes'

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0)
  const theme = themes[selectedTheme]
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        modal,
        openModal,
        closeModal,
      }}
    >
      <GlobalUpdateContext.Provider value={setSelectedTheme}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)