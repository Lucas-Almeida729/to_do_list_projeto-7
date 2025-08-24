import { useState } from 'react';
import type { Todo } from './types'; 
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoCounter from './components/TodoCounter';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Aprender sobre React', isCompleted: true },
    { id: 2, text: 'Criar um projeto To Do List', isCompleted: false },
  ]);

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

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <h1>Atenas To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoCounter todos={todos} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      </div>
    </div>
  );
}

export default App;