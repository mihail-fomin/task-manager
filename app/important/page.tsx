import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/Tasks/Tasks";

export default function page() {
  // const { importantTasks } = useGlobalState()
  return <Tasks title="Important Tasks" tasks={[]}/>
}