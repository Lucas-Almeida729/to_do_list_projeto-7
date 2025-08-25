import React from 'react';
import type { Task as TaskType } from '../types';
import { Draggable } from 'react-beautiful-dnd'; // Importa o componente Draggable

interface TaskProps {
  task: TaskType;
  index: number; // Precisamos do índice para o Draggable
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    // Envolvemos o nosso card com o componente Draggable
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          // As props abaixo são necessárias para a biblioteca funcionar
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
};

export default Task;