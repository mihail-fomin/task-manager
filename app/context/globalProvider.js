'use client'
import React, { createContext, useState, useContext } from 'react'
import themes from './themes'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
  const { user } = useUser()

  const [selectedTheme, setSelectedTheme] = useState(0)
  const theme = themes[selectedTheme]

  const [tasks, setTasks] = useState([])
  const [modal, setModal] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const collapseMenu = () => {
    setCollapsed(!collapsed)
  }


  const allTasks = async () => {
    setIsloading(true)
    try {
      const response = await axios.get('/api/tasks')

      const sorted = response.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() 
      })

      setTasks(sorted)
      setIsloading(false)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  const deleteTask = async (id) => {
    setIsloading(true)

    try {
      await axios.delete(`/api/tasks/${id}`)

      allTasks()
      setIsloading(false)
      toast.success('Task deleted')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  const updateTask = async (task) => {
    setIsloading(true)

    try {
      await axios.put(`/api/tasks`, task)

      allTasks()
      setIsloading(false)
      toast.success('Task updated')
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    }
  }

  const completedTasks = tasks.filter((task) => task.isCompleted === true)
  const incompletedTasks = tasks.filter((task) => task.isCompleted === false)
  const importantTasks = tasks.filter((task) => task.isImportant === true)

  React.useEffect(() => {
    if (user) {
      allTasks()
    }
  }, [user])

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        allTasks,
        completedTasks,
        incompletedTasks,
        importantTasks,
        deleteTask,
        updateTask,
        isLoading,
        modal,
        openModal,
        closeModal,
        collapsed,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={setSelectedTheme}>{children}</GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
