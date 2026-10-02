# Ejercicio 3 — Interfaces, arrays y funciones tipadas

## Archivo: `alumnos.ts`

- `interface Alumno { nombre: string; nota: number; activo?: boolean }`
  — `activo` es **opcional** (el `?`).
- `alumnos: Alumno[]` con 4 registros (uno de ellos sin `activo`, para
  demostrar que la propiedad opcional puede omitirse).
- `calcularMedia(alumnos: Alumno[]): number` — usa `reduce` para sumar
  las notas y divide entre el número de alumnos.
- `mostrarResumen(alumno: Alumno): void` — imprime nombre, nota y
  estado de cada alumno.

## Compilar y ejecutar

```bash
tsc alumnos.ts
node alumnos.js
```

Salida esperada:
```
Ana — nota: 8.5 — activo: true
Luis — nota: 6.2 — activo: true
Marta — nota: 9.1 — activo: false
Pedro — nota: 4.8 — activo: false
Media de la clase: 7.15
```

## Provocar el error de tipos

Al final del archivo hay líneas comentadas. Descomenta esta:

```ts
calcularMedia('no soy un array de alumnos');
```

y ejecuta:

```bash
tsc --noEmit alumnos.ts
```

Verás:
```
error TS2345: Argument of type 'string' is not assignable to
parameter of type 'Alumno[]'.
```

También puedes probar a pasar un array con un objeto incompleto
(por ejemplo, sin `nota`) para ver un error distinto: TypeScript
exige que **todas las propiedades obligatorias** de `Alumno` estén
presentes.

## Idea clave

Las interfaces describen la "forma" que debe tener un objeto.
Cualquier función que reciba ese tipo como parámetro queda protegida
en tiempo de compilación contra argumentos que no cumplan esa forma.
