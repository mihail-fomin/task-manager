'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import { useGlobalState } from '@/app/context/globalProvider'
import styled from 'styled-components'
import Button from '../Button/Button'
import { add } from '@/app/utils/Icons'
import { edit } from '@/app/utils/Icons'

export default function IssueContent() {
  const { theme, fetchAllTasks, closeModal, editingTask, updateTask, closeEditModal } = useGlobalState()

  const [title, setTitle] = useState(editingTask ? editingTask.title : '')
  const [description, setDescription] = useState(editingTask ? editingTask.description : '')
  const [date, setDate] = useState(editingTask ? editingTask.date : '')
  const [completed, setCompleted] = useState(editingTask ? editingTask.isCompleted : false)
  const [important, setImportant] = useState(editingTask ? editingTask.isImportant : false)

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'description':
        setDescription(e.target.value)
        break
      case 'date':
        setDate(e.target.value)
        break
      case 'completed':
        setCompleted(e.target.checked)
        break
      case 'important':
        setImportant(e.target.checked)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      let response
      if (editingTask) {
        const task = {
          id: editingTask.id,
          title,
          description,
          date,
          isCompleted: completed,
          isImportant: important,
        }

        response = updateTask(task)
      } else {
        const task = {
          title,
          description,
          date,
          completed,
          important,
        }

        response = await axios.post('/api/tasks', task)
      }

      if (response.data?.error) {
        toast.error(response.data.error)
        return
      }

      fetchAllTasks()

      if (editingTask) {
        closeEditModal()
        return
      }

      toast.success('Task created successfully')
      closeModal()
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  return (
    <IssueContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>{editingTask ? 'Update the Task' : 'Create a Task'}</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} name="title" onChange={handleChange('title')} placeholder="Title" />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          rows={4}
          onChange={handleChange('description')}
          placeholder="description"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Date</label>
        <input type="date" id="date" value={date} name="date" onChange={handleChange('date')} />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          className="custom-checkbox"
          type="checkbox"
          id="completed"
          checked={completed}
          name="completed"
          value="yes"
          onChange={handleChange('completed')}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          id="important"
          checked={important}
          name="important"
          onChange={handleChange('important')}
        />
      </div>

      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={editingTask ? 'Update the Task' : 'Create a Task'}
          icon={editingTask ? edit : add}
          padding={'0.8rem 2rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1.2rem'}
          background={'rgb(0, 163, 255)'}
        />
      </div>
    </IssueContentStyled>
  )
}

const IssueContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`
