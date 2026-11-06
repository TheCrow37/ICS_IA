import type { Tarea as TareaData } from "../types";
import { Tarea } from "./Tarea";

interface PropsListaTareas {
  tareas: TareaData[];
  onCambiarCompletada: (id: number) => void;
}

export function ListaTareas({ tareas, onCambiarCompletada }: PropsListaTareas) {
  if (tareas.length === 0) {
    return <p className="empty-state">No hay tareas para este filtro.</p>;
  }

  return (
    <ul className="task-list">
      {tareas.map((tarea) => (
        <Tarea key={tarea.id} tarea={tarea} onCambiarCompletada={onCambiarCompletada} />
      ))}
    </ul>
  );
}
