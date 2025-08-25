import React from 'react';
import type { Todo } from '../types';

// O tipo do filtro que vamos usar
type FilterType = 'all' | 'pending' | 'completed';

interface TodoCounterProps {
  todos: Todo[];
  filter: FilterType; // Recebe o filtro ativo
  setFilter: (filter: FilterType) => void; // Recebe a função para mudar o filtro
}

const TodoCounter: React.FC<TodoCounterProps> = ({ todos, filter, setFilter }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.isCompleted).length;
  const pending = total - completed;

  return (
    <div className="todo-counter">
      <span
        className={filter === 'all' ? 'active-filter' : ''}
        onClick={() => setFilter('all')}
      >
        Total: {total}
      </span>
      <span
        className={filter === 'pending' ? 'active-filter' : ''}
        onClick={() => setFilter('pending')}
      >
        Pendentes: {pending}
      </span>
      <span
        className={filter === 'completed' ? 'active-filter' : ''}
        onClick={() => setFilter('completed')}
      >
        Concluídas: {completed}
      </span>
    </div>
  );
};

export default TodoCounter;