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
        return { backgroundColor: "lightcoral" };
      case 2:
        return { backgroundColor: "lightgreen" };
      case 3:
        return { backgroundColor: "lightblue" };
      default:
        return {};
    }
  };

  const onDone = (completedTodo) => {
    console.log(
      "completedTodo " + completedTodo.sno + " , " + completedTodo.description
    );
    const updatedToDoList = toDoList.filter(
      (todo) => todo.sno !== completedTodo.sno
    );
    setToDoList(updatedToDoList);
  };

  return (
    <div className="container" style={{ margin: "40px" }}>
      <div className="row">
        {toDoList.map((todo) => (
          <div key={todo.sno} className="col-sm-4 mb-3 mb-sm-3">
            <div className="card" style={getPriorityColorClass(todo.priority)}>
              <div className="card-body">
                <h5 className="card-title">{todo.task}</h5>
                <p className="card-text">{todo.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => onDone(todo)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
