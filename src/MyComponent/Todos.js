import React, { useState } from "react";
import { TodoItem } from "./TodoItem";
import { AddToDoItem } from "./AddToDoItem";

export const Todos = () => {
  const [toDoList, setToDoList] = useState([]);

  const onDone = (completedTodo) => {
    console.log(
      "completedTodo " + completedTodo.sno + " , " + completedTodo.description
    );
    const updatedToDoList = toDoList.filter(
      (todo) => todo.sno !== completedTodo.sno
    );
    setToDoList(updatedToDoList);
  };

  const addTodo = (newTodo) => {
    newTodo.sno = toDoList.length + 1;
    setToDoList([...toDoList, newTodo]);
  };

  return (
    <div>
      <h3>Todos</h3>
      <AddToDoItem addTodo={addTodo} />
      <TodoItem onDone={onDone} toDoList={toDoList} />
    </div>
  );
};
