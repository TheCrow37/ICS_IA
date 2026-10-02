// ==========================================================
// Ejercicio 2 — Tipos básicos, inferencia y objetos
// ==========================================================

// --- 1. Variables con INFERENCIA de tipo ---
// TypeScript deduce el tipo a partir del valor asignado.
let edad = 30; // inferido como "number"
let nombre = 'Marta'; // inferido como "string"
let esActivo = true; // inferido como "boolean"

// --- 2. Las mismas variables con tipo ANOTADO explícitamente ---
let edad2: number = 30;
let nombre2: string = 'Marta';
let esActivo2: boolean = true;

// --- 3. Provocar un error de tipos ---
// Descomenta la siguiente línea para ver el error del compilador:
//
//   edad = 'treinta';
//   ❌ Error: Type 'string' is not assignable to type 'number'.
//
// Esto ocurre porque, aunque no escribimos ": number" explícitamente,
// TypeScript ya infirió que "edad" es de tipo number en su declaración
// y no permite reasignarle un valor de otro tipo.

// --- 4. Corrección del error ---
// La forma correcta de cambiar el valor es usar un número:
edad = 31; // ✅ correcto, sigue siendo number

// Otro error típico y su corrección:
// nombre = 123;              ❌ Error: Type 'number' is not assignable to type 'string'.
nombre = 'Marta García'; // ✅ correcto

console.log(edad, nombre, esActivo);
console.log(edad2, nombre2, esActivo2);

// ==========================================================
// Objeto tipado "persona"
// ==========================================================

let persona: { nombre: string; edad: number; esSocio: boolean } = {
  nombre: 'Carlos',
  edad: 25,
  esSocio: false,
};

console.log(persona);

// --- Intentar asignar una propiedad inexistente ---
// Descomenta la siguiente línea para ver el error:
//
//   persona.apellido = 'López';
//   ❌ Error: Property 'apellido' does not exist on type
//      '{ nombre: string; edad: number; esSocio: boolean; }'.
//
// El tipo del objeto "persona" solo define nombre, edad y esSocio,
// así que TypeScript rechaza cualquier propiedad que no esté declarada
// en esa forma (esto es el "shape typing" / tipado estructural).
