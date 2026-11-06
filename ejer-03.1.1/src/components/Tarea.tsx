import type { Tarea as TareaData } from "../types";

interface PropsTarea {
  tarea: TareaData;
  onCambiarCompletada: (id: number) => void;
}

export function Tarea({ tarea, onCambiarCompletada }: PropsTarea) {
  return (
    <li className={`task-card task-card--${tarea.prioridad}${tarea.completada ? " task-card--completed" : ""}`}>
      <label className="task-label">
        <input
          checked={tarea.completada}
          className="task-checkbox"
          onChange={() => onCambiarCompletada(tarea.id)}
          type="checkbox"
        />
        <span className="task-text">{tarea.texto}</span>
      </label>
      <span className={`priority priority--${tarea.prioridad}`}>
        Prioridad {tarea.prioridad}
      </span>
    </li>
  );
}
