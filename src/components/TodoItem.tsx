import React, { useState } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, removeTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const handleSave = () => {
    if (value.trim() !== "") {
      updateTodo(todo.id, value);
    }
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
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
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => removeTodo(todo.id)}>Remover</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
