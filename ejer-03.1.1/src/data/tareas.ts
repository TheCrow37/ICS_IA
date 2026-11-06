import type { Tarea } from "../types";

export const tareasIniciales: Tarea[] = [
  { id: 1, texto: "Aprender sobre renderizado de listas en React", completada: true, prioridad: "alta" },
  { id: 2, texto: "Implementar el filtrado de tareas", completada: false, prioridad: "alta" },
  { id: 3, texto: "Entender cómo se eleva el estado", completada: false, prioridad: "media" },
  { id: 4, texto: "Estilizar los componentes con Bootstrap", completada: true, prioridad: "baja" },
  { id: 5, texto: "Crear el componente de resumen condicional", completada: false, prioridad: "media" },
  { id: 6, texto: "Desplegar la aplicación en Netlify", completada: false, prioridad: "baja" },
];
