import React, { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { AddToDoItem } from "./AddToDoItem";

const API_BASE_URL = "https://icr7.in/toDoApi";

export const Todos = ({ myToDos, setMyToDos }) => {
  const onDone = (completedTodo) => {
    fetch(`${API_BASE_URL}/deleteToDoById/${completedTodo.sno}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete Todo");
        }
        return response.text();
      })
      .then(() => {
        // Update the state after successful deletion
        const updatedToDoList = myToDos.filter(
          (todo) => todo.sno !== completedTodo.sno
        );
        setMyToDos(updatedToDoList);
      })
      .catch((error) => {
        console.error("Error deleting Todo:", error);
      });
  };

  const addTodo = (newTodo) => {
    newTodo.sno = myToDos.length + 1;

    fetch(`${API_BASE_URL}/saveToDo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save Todo");
        }
        return response.text();
      })
      .then(() => {
        // Update the state after successful save
        setMyToDos([...myToDos, newTodo]);
      })
      .catch((error) => {
        console.error("Error saving Todo:", error);
      });
  };

  return (
    <div>
      <h3>Todos</h3>
      <AddToDoItem addTodo={addTodo} />
      <TodoItem onDone={onDone} myToDos={myToDos} />
    </div>
  );
};
