'use client';

import React, {useState} from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const handleChange = (name: string) => (e: any) => {
    switch(name) {
      case "title":
        setTitle(e.target.value)
        break;
      case "description":
        setDescription(e.target.value)
        break;
      case "date":
        setDate(e.target.value)
        break;
      case "completed":
        setCompleted(e.target.value)
        break;
      case "important":
        setImportant(e.target.value)
        break;
      default:
        break;
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const task = {
      title,
      description,
      date,
      completed,
      important
    }
  }

  return <>
    <form onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Title"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          rows={4}
          onChange={handleChange("description")}
          placeholder="description"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={handleChange(("date"))}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange(("completed"))}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange(("important"))}
        />
      </div>
      <div className="submit-btn">
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  </>
}