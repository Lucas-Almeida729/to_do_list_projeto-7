import { useState } from 'react';
import './App.css';
import type { Column as ColumnType } from './types';
import Column from './components/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'; // Importa o DragDropContext

// Os dados iniciais permanecem os mesmos
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Configurar o ambiente de desenvolvimento' },
    'task-2': { id: 'task-2', title: 'Criar a estrutura de componentes' },
    'task-3': { id: 'task-3', title: 'Estilizar os cards de tarefas' },
    'task-4': { id: 'task-4', title: 'Revisar o código com o time' },
  },
  columns: {
    'column-1': { id: 'column-1', title: '📋 A Fazer', taskIds: ['task-1', 'task-2', 'task-3'] },
    'column-2': { id: 'column-2', title: '🚀 Em Andamento', taskIds: ['task-4'] },
    'column-3': { id: 'column-3', title: '✅ Concluído', taskIds: [] },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

function App() {
  const [boardData, setBoardData] = useState(initialData);

  // --- Função para Adicionar Novas Tarefas ---
  const addTask = (title: string, columnId: string) => {
    // Gera um ID único para a nova tarefa
    const newTaskId = `task-${Date.now()}`;
    // Cria o novo objeto de tarefa
    const newTask = { id: newTaskId, title };

    // Atualiza o estado de forma imutável
    setBoardData(prevData => {
      // Cria uma nova cópia do objeto de tarefas, incluindo a nova
      const newTasks = {
        ...prevData.tasks,
        [newTaskId]: newTask,
      };

      // Pega a coluna correta e cria uma nova lista de IDs de tarefas
      const column = prevData.columns[columnId];
      const newTaskIds = [...column.taskIds, newTaskId];

      // Cria uma nova cópia do objeto de colunas, com a coluna atualizada
      const newColumns = {
        ...prevData.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      };

      // Retorna o novo estado completo do quadro
      return {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };
    });
  };

  // --- Função que lida com o Fim do Arrastar e Soltar ---
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // 1. Verifica se o card foi solto fora de uma área válida
    if (!destination) {
      return;
    }

    // 2. Verifica se o card foi solto no mesmo local onde começou
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Pega a coluna de início e a coluna de fim
    const startColumn = boardData.columns[source.droppableId];
    const finishColumn = boardData.columns[destination.droppableId];

    // --- Lógica para Mover o Card ---

    // 3. Mover dentro da mesma coluna
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      // Remove o ID do local original
      newTaskIds.splice(source.index, 1);
      // Insere o ID no novo local
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };
      setBoardData(newState);
      return;
    }

    // 4. Mover de uma coluna para outra
    const startTaskIds = Array.from(startColumn.taskIds);
    // Remove o ID da coluna de origem
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    // Adiciona o ID na coluna de destino
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setBoardData(newState);
  };


  return (
    // Envolvemos todo o quadro no DragDropContext e passamos a nossa função de lógica
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app-container">
        <h1 className="board-title">Meu Quadro Kanban</h1>
        <div className="board">
          {boardData.columnOrder.map(columnId => {
            const column = boardData.columns[columnId];
            const tasks = column.taskIds.map(taskId => boardData.tasks[taskId]);

            // Passa a função addTask para cada coluna
            return <Column key={column.id} column={column} tasks={tasks} addTask={addTask} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;