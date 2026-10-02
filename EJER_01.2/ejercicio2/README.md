# Ejercicio 2 — Tipos básicos, inferencia y objetos

## Archivo

`tipos-basicos.ts` contiene:

- `edad`, `nombre`, `esActivo` → declarados dejando que TypeScript **infiera**
  el tipo.
- `edad2`, `nombre2`, `esActivo2` → las mismas variables pero con el tipo
  **anotado explícitamente** (`: number`, `: string`, `: boolean`).
- Un objeto tipado `persona: { nombre: string; edad: number; esSocio: boolean }`.

## Cómo comprobar los errores de tipos

El archivo compila limpio tal como está, porque las líneas que provocan
error están comentadas. Para verlas en acción:

1. Abre `tipos-basicos.ts`.
2. Descomenta esta línea:
   ```ts
   edad = 'treinta';
   ```
3. Ejecuta:
   ```bash
   tsc --noEmit tipos-basicos.ts
   ```
   Verás:
   ```
   error TS2322: Type 'string' is not assignable to type 'number'.
   ```
4. Vuelve a comentarla (o corrígela con un número, como hace el propio
   archivo con `edad = 31;`) y repite el proceso con:
   ```ts
   persona.apellido = 'López';
   ```
   Error esperado:
   ```
   error TS2339: Property 'apellido' does not exist on type
   '{ nombre: string; edad: number; esSocio: boolean; }'.
   ```

## Compilar y ejecutar la versión correcta

```bash
tsc tipos-basicos.ts
node tipos-basicos.js
```

Salida esperada:
```
31 Marta García true
30 Marta true
{ nombre: 'Carlos', edad: 25, esSocio: false }
```

## Idea clave

TypeScript usa **tipado estructural**: un objeto solo puede usar las
propiedades que están definidas en su tipo. Añadir una propiedad no
declarada (`persona.apellido`) es un error en tiempo de compilación,
aunque en JavaScript puro sería perfectamente válido.
