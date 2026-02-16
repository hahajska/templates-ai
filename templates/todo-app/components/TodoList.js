import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Your todo list is empty. Start by adding a task above.
      </div>
    );
  }

  return (
    <div className="divide-y divide-border rounded-md border border-border">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
