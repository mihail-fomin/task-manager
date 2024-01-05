'use client'
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../Components/Tasks/Tasks'

function page() {
  const { incompletedTasks } = useGlobalState()
  return <Tasks title="Incomplete Tasks" tasks={incompletedTasks || []} />
}

export default page
