import type { Tarea } from "../types";

interface PropsResumenTareas {
  tareasVisibles: Tarea[];
  totalTareas: number;
}

export function ResumenTareas({ tareasVisibles, totalTareas }: PropsResumenTareas) {
  let mensaje: string;

  if (tareasVisibles.length === 0) {
    mensaje = "No hay tareas para este filtro.";
  } else if (tareasVisibles.every((tarea) => tarea.completada)) {
    mensaje = "¡Felicidades! Has completado todas las tareas de esta sección.";
  } else {
    mensaje = `Mostrando ${tareasVisibles.length} de ${totalTareas} tareas.`;
  }

  return <p aria-live="polite" className="summary">{mensaje}</p>;
}
