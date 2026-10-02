// ==========================================================
// Ejercicio 5 — Lógica principal del mini proyecto
// ==========================================================

import { Alumno, Curso, Nivel } from './modelos';

function calcularMedia(alumnos: Alumno[]): number {
  if (alumnos.length === 0) return 0;
  const suma = alumnos.reduce((acc, a) => acc + a.nota, 0);
  return suma / alumnos.length;
}

function describirCurso(curso: Curso): string {
  const nombresNivel: Record<Nivel, string> = {
    [Nivel.BASICO]: 'Básico',
    [Nivel.INTERMEDIO]: 'Intermedio',
    [Nivel.AVANZADO]: 'Avanzado',
  };

  const activos = curso.alumnos.filter((a) => a.estado === 'activo').length;
  const media = calcularMedia(curso.alumnos).toFixed(2);

  return `Curso "${curso.titulo}" (${nombresNivel[curso.nivel]}): ` +
    `${curso.alumnos.length} alumnos (${activos} activos), media ${media}.`;
}

const curso: Curso = {
  titulo: 'TypeScript desde cero',
  nivel: Nivel.INTERMEDIO,
  alumnos: [
    { nombre: 'Ana', nota: 8.5, estado: 'activo' },
    { nombre: 'Luis', nota: 6.2, estado: 'activo' },
    { nombre: 'Marta', nota: 9.1, estado: 'pendiente' },
    { nombre: 'Pedro', nota: 4.8, estado: 'inactivo' },
  ],
};

console.log(describirCurso(curso));

// Prueba en vivo con tsc -w:
// cambia cualquier nota de arriba, guarda el archivo, y observa cómo
// la terminal donde corre "tsc -w" recompila automáticamente y
// vuelve a generar dist/principal.js con la media actualizada.
