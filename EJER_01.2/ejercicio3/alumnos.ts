// ==========================================================
// Ejercicio 3 — Interfaces, arrays y funciones tipadas
// ==========================================================

interface Alumno {
  nombre: string;
  nota: number;
  activo?: boolean; // opcional
}

const alumnos: Alumno[] = [
  { nombre: 'Ana', nota: 8.5, activo: true },
  { nombre: 'Luis', nota: 6.2, activo: true },
  { nombre: 'Marta', nota: 9.1 }, // "activo" es opcional, se omite
  { nombre: 'Pedro', nota: 4.8, activo: false },
];

// --- Función que calcula la nota media usando reduce ---
function calcularMedia(alumnos: Alumno[]): number {
  if (alumnos.length === 0) return 0;
  const suma = alumnos.reduce((acumulado, alumno) => acumulado + alumno.nota, 0);
  return suma / alumnos.length;
}

// --- Función que imprime los datos de un alumno ---
function mostrarResumen(alumno: Alumno): void {
  const estado = alumno.activo ?? false;
  console.log(
    `${alumno.nombre} — nota: ${alumno.nota} — activo: ${estado}`
  );
}

alumnos.forEach(mostrarResumen);
console.log('Media de la clase:', calcularMedia(alumnos).toFixed(2));

// --- Provocar un error de tipos al llamar a calcularMedia ---
// Descomenta la siguiente línea para ver el error del compilador:
//
//   calcularMedia('no soy un array de alumnos');
//   ❌ Error: Argument of type 'string' is not assignable to
//      parameter of type 'Alumno[]'.
//
// También fallaría, por ejemplo, pasando un array con un objeto
// incompleto:
//
//   calcularMedia([{ nombre: 'Sin nota' }]);
//   ❌ Error: Property 'nota' is missing in type '{ nombre: string; }'
//      but required in type 'Alumno'.
