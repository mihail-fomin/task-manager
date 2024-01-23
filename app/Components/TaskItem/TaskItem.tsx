'use client'
import { useGlobalState } from '@/app/context/globalProvider'
import { edit, trash } from '@/app/utils/Icons'
import React from 'react'
import styled from 'styled-components'
import formatDate from '@/app/utils/formatDate'
import { Task } from '../Modals/models'

interface Props {
  task: Task
}

function TaskItem({ task}: Props) {
  const { theme, deleteTask, updateTask, openModal, openEditModal } = useGlobalState()


  return (
    <TaskItemStyled theme={theme}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p className="date">{formatDate(task.date)}</p>
      <div className="task-footer">
        {task.isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const newStatus = {
                id: task.id,
                isCompleted: !task.isCompleted,
              }

              updateTask(newStatus)
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incompleted"
            onClick={() => {
              const newStatus = {
                id: task.id,
                isCompleted: !task.isCompleted,
              }
              updateTask(newStatus)
            }}
          >
            Incompleted
          </button>
        )}
        <button className="edit"
          onClick={() => openEditModal(task)}  
        >{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(task.id)
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  )
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incompleted {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`

export default TaskItem
