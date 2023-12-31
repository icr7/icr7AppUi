import React from "react";
import { TodoItem } from "./TodoItem";
import { AddToDoItem } from "./AddToDoItem";

export const Todos = () => {
  return (
    <div>
      <h3>Todos</h3>
      <AddToDoItem />
      <TodoItem />
    </div>
  );
};
