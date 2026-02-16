import React from "react";
import { Trash2, CheckCircle } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-3">
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 transition-colors"
      >
        <CheckCircle
          size={20}
          className={
            todo.completed
              ? "text-primary"
              : "text-muted-foreground/40 hover:text-muted-foreground"
          }
        />
      </button>
      <span
        className={
          todo.completed
            ? "flex-1 line-through text-muted-foreground"
            : "flex-1 text-foreground"
        }
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
