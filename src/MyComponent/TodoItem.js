import React, { useState } from "react";

export const TodoItem = ({ onDone, myToDos }) => {
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

  const handleDoneClick = (completedTodo) => {
    onDone(completedTodo);
  };
  return (
    <div className="container" style={{ margin: "40px" }}>
      <div className="row">
        {myToDos.map((todo) => (
          <div key={todo.sno} className="col-sm-4 mb-3 mb-sm-3">
            <div className="card" style={getPriorityColorClass(todo.priority)}>
              <div className="card-body">
                <h5 className="card-title">{todo.task}</h5>
                <p className="card-text">{todo.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDoneClick(todo)}
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
