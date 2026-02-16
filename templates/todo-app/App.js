import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodo(text) {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  }

  function handleToggle(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-lg mx-auto mt-12 rounded-lg border border-border bg-card p-6 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Todo List</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {todos.length === 0
              ? "No todos yet. Add one below!"
              : `${remainingCount} item${remainingCount !== 1 ? "s" : ""} remaining`}
          </p>
        </div>
        <AddTodo onAdd={handleAddTodo} />
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
}
