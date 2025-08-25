// Define a "forma" de uma única tarefa (card)
export interface Task {
  id: string;      // Usaremos string para IDs, uma prática comum (ex: 'task-1')
  title: string;   // O título que aparece no card
}

// Define a "forma" de uma coluna
export interface Column {
  id: string;      // O ID da coluna (ex: 'column-1')
  title: string;   // O título da coluna (ex: "A Fazer")
  taskIds: string[]; // Um array que guarda apenas os IDs das tarefas nesta coluna
}