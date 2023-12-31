import React, { useState, useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { AddToDoItem } from "./AddToDoItem";

const API_BASE_URL = "https://icr7.in/toDoApi";

export const Todos = () => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/getToDos`)
      .then((response) => response.json())
      .then((data) => {
        console.log("api data -> ", data);
        setToDoList(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const onDone = (completedTodo) => {
    console.log(
      "completedTodo " + completedTodo.sno + " , " + completedTodo.description
    );
    fetch(`${API_BASE_URL}/deleteToDoById/${completedTodo.sno}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete Todo");
        }
        return response.text();
      })
      .then(() => {
        // Update the state after successful deletion
        const updatedToDoList = toDoList.filter(
          (todo) => todo.sno !== completedTodo.sno
        );
        setToDoList(updatedToDoList);
      })
      .catch((error) => {
        console.error("Error deleting Todo:", error);
      });
  };

  const addTodo = (newTodo) => {
    newTodo.sno = toDoList.length + 1;

    fetch(`${API_BASE_URL}/saveToDo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        setToDoList([...toDoList, newTodo]);
      })
      .catch((error) => {
        console.error("Error saving Todo:", error);
      });
  };

  return (
    <div>
      <h3>Todos</h3>
      <AddToDoItem addTodo={addTodo} />
      <TodoItem onDone={onDone} toDoList={toDoList} />
    </div>
  );
};
