import React, { useState } from "react";

export const AddToDoItem = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!task || !priority || !description) {
      alert("Please fill in all fields");
      return;
    }

    // Create a new todo object
    const newTodo = {
      task: task,
      priority: parseInt(priority),
      description: description,
    };

    // Update the todo list
    addTodo(newTodo);

    // Clear the input fields
    setTask("");
    setPriority("");
    setDescription("");
  };
  return (
    <div>
      <form
        className="row row-cols-lg-auto g-3 align-items-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-12">
          <label
            className="visually-hidden"
            htmlFor="inlineFormInputGroupUsername"
          >
            Username
          </label>
          <div className="input-group">
            <div className="input-group-text">todo</div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Task name"
              value={task}
              onChange={handleTaskChange}
            />
          </div>
        </div>

        <div className="col-12">
          <label className="visually-hidden" htmlFor="inlineFormSelectPref">
            Preference
          </label>
          <select
            className="form-select"
            id="inlineFormSelectPref"
            value={priority}
            onChange={handlePriorityChange}
          >
            <option value="" disabled selected>
              Select Priority
            </option>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div className="col-12">
          <label
            className="visually-hidden"
            htmlFor="inlineFormInputGroupUsername"
          >
            Discription
          </label>
          <div className="input-group">
            <div className="input-group-text">Discription</div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
