import React, { useState } from 'react';
import type { Column as ColumnType, Task as TaskType } from '../types';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd'; // Importa o componente Droppable

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  addTask: (title: string, columnId: string) => void; // Função para adicionar tarefa
}

const Column: React.FC<ColumnProps> = ({ column, tasks, addTask }) => {
  // Estado para controlar o input de nova tarefa
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Função para lidar com a submissão do formulário de nova tarefa
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, column.id);
      setNewTaskTitle(''); // Limpa o input
    }
  };

  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      {/* A área da lista de tarefas agora é um Droppable */}
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            // Props necessárias para o Droppable
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Mapeia as tarefas e passa o 'index' para o Task */}
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {/* Placeholder é um espaço que se abre enquanto arrastamos um item */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Formulário para adicionar uma nova tarefa */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="+ Adicionar um cartão"
          className="add-task-input"
        />
        <button type="submit" className="add-task-button">Adicionar</button>
      </form>
    </div>
  );
};

export default Column;