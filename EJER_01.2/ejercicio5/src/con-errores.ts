// ==========================================================
// Este archivo contiene errores de tipos A PROPÓSITO.
// Está excluido en tsconfig.json ("exclude") para que NO
// rompa la compilación del proyecto.
// ==========================================================

import { Alumno } from './modelos';

// Error 1: falta la propiedad "estado", obligatoria en Alumno
const alumnoIncompleto: Alumno = {
  nombre: 'Sin estado',
  nota: 7,
};

// Error 2: tipo incorrecto en una propiedad
const otraNota: number = 'no soy un número';

// Si quitas este archivo del "exclude" de tsconfig.json,
// la compilación con "tsc" fallará mostrando estos dos errores.
