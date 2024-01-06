'use client'
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../Components/Tasks/Tasks'

export default function Page() {
  const { incompletedTasks } = useGlobalState()
  return <Tasks title="Incomplete Tasks" tasks={incompletedTasks || []} />
}
