import React from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <span
        className="todo-item-text"
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <div className="todo-item-actions">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
          aria-label={`Marcar '${todo.text}' como concluída`}
        />
        <button onClick={() => removeTodo(todo.id)}>
          Remover
        </button>
      </div>
    </div>
  );
};

export default TodoItem;