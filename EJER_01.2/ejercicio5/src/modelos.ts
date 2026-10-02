// ==========================================================
// Ejercicio 5 — Modelos del mini proyecto
// ==========================================================

export enum Nivel {
  BASICO,
  INTERMEDIO,
  AVANZADO,
}

export interface Alumno {
  nombre: string;
  nota: number;
  estado: 'activo' | 'inactivo' | 'pendiente'; // tipo unión
}

export interface Curso {
  titulo: string;
  nivel: Nivel;
  alumnos: Alumno[];
}
