import React from 'react';

interface TodoFilterProps {
  filter: {
    pending: boolean;
    completed: boolean;
  };
  setFilter: (filter: { pending: boolean; completed: boolean }) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="todo-filter">
      <label>
        <input
          type="checkbox"
          name="pending"
          checked={filter.pending}
          onChange={handleFilterChange}
        />
        Pendentes
      </label>
      <label>
        <input
          type="checkbox"
          name="completed"
          checked={filter.completed}
          onChange={handleFilterChange}
        />
        Concluídas
      </label>
    </div>
  );
};

export default TodoFilter;