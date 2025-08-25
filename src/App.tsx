import { useState, useEffect } from 'react';
import type { Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoCounter from './components/TodoCounter';
import TodoFilter from './components/TodoFilter'; // 1. Importe o novo componente
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Adicione um estado para os filtros
  const [filter, setFilter] = useState({
    pending: false,
    completed: false,
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // 3. Crie uma lista de tarefas filtrada
  const filteredTodos = todos.filter(todo => {
    const { pending, completed } = filter;
    // Se nenhum filtro estiver ativo ou ambos, mostra tudo
    if ((!pending && !completed) || (pending && completed)) {
      return true;
    }
    if (pending && !todo.isCompleted) {
      return true;
    }
    if (completed && todo.isCompleted) {
      return true;
    }
    return false;
  });

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1>Lista de tarefas</h1>
        <TodoForm addTodo={addTodo} />
        {/* 4. Adicione o componente de filtro */}
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoCounter todos={todos} />
        <TodoList
          // 5. Passe a lista filtrada para o TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;