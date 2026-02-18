---
name: Todo App
goal: Help users extend task-management flows with clear state ownership, predictable component boundaries, and accessible interactions
stack:
  - React 18
  - Vite 5
  - Tailwind CSS (CDN)
  - lucide-react
shadcn-components:
  - Card
  - Input
  - Button
  - Checkbox
---

## Purpose
A local, in-memory todo manager optimized for quick create/complete/delete workflows and clear list readability.

## Components in Use
- `App.js`: Owns `todos` state and core handlers (`handleAddTodo`, `handleToggle`, `handleDelete`).
- `components/AddTodo.js`: Controlled input form for creating todos.
- `components/TodoList.js`: Empty-state handling and list wrapper.
- `components/TodoItem.js`: Single todo row with toggle and delete actions.

## Extension Patterns
### Add a new todo field (for example priority)
1. Extend the todo object in `App.js` inside `handleAddTodo`.
2. Update `components/AddTodo.js` to collect the new input.
3. Pass the new field through `TodoList` props if required.
4. Render and style the field in `components/TodoItem.js`.

### Add list filters (all, active, completed)
1. Add `filter` state in `App.js`.
2. Compute `visibleTodos` from `todos` and `filter`.
3. Pass `visibleTodos` to `components/TodoList.js`.
4. Add filter controls as a small new component in `components/` when logic grows.

### Add inline edit behavior
1. Add edit handlers in `App.js` (start edit, save, cancel).
2. Track edit mode per item id.
3. Update `components/TodoItem.js` to switch between text and input view.
4. Keep keyboard flow explicit (`Enter` to save, `Escape` to cancel).

## Do
- Keep todo state updates immutable (`map`, `filter`, spread).
- Keep business logic in `App.js` and pass behavior through props.
- Add `aria-label` to icon-only buttons and preserve focus styles.

## Don't
- Do not introduce global state libraries for this template scope.
- Do not persist data unless explicitly requested.
- Do not add dependencies for behavior that is straightforward in React.
