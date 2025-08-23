import React from 'react';
import type { Todo } from '../types';

interface TodoCounterProps {
  todos: Todo[];
}

const TodoCounter: React.FC<TodoCounterProps> = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.isCompleted).length;
  const pending = total - completed;

  return (
    <div className="todo-counter">
      <span>Total: {total}</span> |{' '}
      <span>Pendentes: {pending}</span> |{' '}
      <span>Concluídas: {completed}</span>
    </div>
  );
};

export default TodoCounter;