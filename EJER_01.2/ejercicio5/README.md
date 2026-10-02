# Ejercicio 5 — Mini proyecto

## Estructura

```
ejercicio5/
├── tsconfig.json
├── src/
│   ├── modelos.ts       ← interfaces Alumno, Curso + enum Nivel
│   ├── principal.ts     ← lógica principal (importa de modelos.ts)
│   └── con-errores.ts   ← errores deliberados, EXCLUIDO de la compilación
└── dist/                ← se genera al compilar (no existe todavía)
```

## `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/principal.ts"],
  "exclude": ["src/con-errores.ts"]
}
```

- `rootDir`/`outDir` → los `.ts` viven en `src/`, los `.js` se generan
  en `dist/` manteniendo la misma estructura.
- `include: ["src/principal.ts"]` → el punto de entrada explícito es
  `principal.ts`. **`modelos.ts` no hace falta incluirlo a mano**:
  como `principal.ts` lo importa (`import { ... } from './modelos'`),
  TypeScript lo arrastra automáticamente a la compilación.
- `exclude: ["src/con-errores.ts"]` → ese archivo tiene errores de
  tipos a propósito (una propiedad obligatoria que falta y una
  asignación de tipo incorrecta) y queda fuera de la compilación para
  no romperla. Puedes abrirlo y ver los errores comentados con `//`.

## Contenido de `modelos.ts`

- `enum Nivel { BASICO, INTERMEDIO, AVANZADO }`
- `interface Alumno` con un tipo unión: `estado: 'activo' | 'inactivo' | 'pendiente'`
- `interface Curso { titulo, nivel: Nivel, alumnos: Alumno[] }`

## Contenido de `principal.ts`

- `calcularMedia(alumnos: Alumno[]): number` — función tipada con
  array de objetos.
- `describirCurso(curso: Curso): string` — combina el enum, el tipo
  unión y la interfaz `Curso` en un mismo mensaje.
- Un objeto `curso: Curso` con 4 alumnos de ejemplo.

## Compilar

```bash
tsc
```

Genera `dist/principal.js` y `dist/modelos.js`. Ejecuta:

```bash
node dist/principal.js
```

Salida esperada:
```
Curso "TypeScript desde cero" (Intermedio): 4 alumnos (2 activos), media 7.15.
```

## Comprobar que `con-errores.ts` no rompe nada

Si quitas `"src/con-errores.ts"` del `exclude` y vuelves a ejecutar
`tsc`, la compilación fallará con dos errores:

```
error TS2741: Property 'estado' is missing in type
'{ nombre: string; nota: number; }' but required in type 'Alumno'.

error TS2322: Type 'string' is not assignable to type 'number'.
```

Vuelve a añadirlo al `exclude` para que el proyecto compile limpio de
nuevo.

## Comprobar la recompilación automática con `tsc -w`

```bash
tsc -w
```

Deja el comando corriendo. Verás en la terminal:
```
Found 0 errors. Watching for file changes.
```

Ahora, en otro editor, cambia por ejemplo la nota de "Ana" en
`src/principal.ts` y guarda. Sin tocar la terminal, verás algo como:

```
File change detected. Starting incremental compilation...
Found 0 errors. Watching for file changes.
```

Y `dist/principal.js` se habrá regenerado automáticamente con el
nuevo valor — pruébalo ejecutando `node dist/principal.js` otra vez.

Para detener el modo watch, pulsa `Ctrl + C`.
