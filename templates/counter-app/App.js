import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="rounded-lg border border-border bg-card p-10 shadow-sm text-center space-y-8">
        <h1 className="text-2xl font-semibold text-foreground">Counter</h1>
        <div
          key={count}
          className="text-6xl font-bold text-foreground animate-fade-in"
        >
          {count}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="inline-flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary/80 transition-colors"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow hover:bg-primary/90 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
