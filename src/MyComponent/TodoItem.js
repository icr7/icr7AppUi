import React, { useState } from "react";

export const TodoItem = () => {
  const [toDoList, setToDoList] = useState([
    {
      sno: 1,
      task: "DSA",
      priority: 3,
      description: "commplete linked list topic",
    },
    {
      sno: 2,
      task: "Java",
      priority: 1,
      description: "revise Exception Handling",
    },
    {
      sno: 3,
      task: "Spring",
      priority: 2,
      description: "Revise Properties Handling in Spring",
    },
    { sno: 4, task: "Gym", priority: 1, description: "Triceps Exercise" },
    {
      sno: 5,
      task: "Microservices",
      priority: 3,
      description:
        "Learn Messager broke concept for Async Communication between microservices",
    },
  ]);

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 1:
        return { backgroundColor: "lightcoral" }; // Define light-red class in your CSS
      case 2:
        return { backgroundColor: "lightgreen" }; // Define light-green class in your CSS
      case 3:
        return { backgroundColor: "lightblue" }; // Define light-blue class in your CSS
      default:
        return {};
    }
  };

  return (
    <div className="container">
      <h3>toDoList</h3>
      <div className="row">
        {toDoList.map((todo) => (
          <div key={todo.sno} className="col-sm-4 mb-3 mb-sm-3">
            <div className="card" style={getPriorityColorClass(todo.priority)}>
              <div className="card-body">
                <h5 className="card-title">{todo.task}</h5>
                <p className="card-text">{todo.description}</p>
                <a href="#" className="btn btn-primary">
                  Done
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
