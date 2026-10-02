# Ejercicio 4 — Uniones, tipos literales y enums

## Archivo: `usuarios.ts`

- `enum Rol { ADMIN, EDITOR, LECTOR }`
- `interface Usuario` con:
  - `rol: Rol` (el enum)
  - `estado: 'activo' | 'inactivo' | 'pendiente'` (unión de tipos
    literales de cadena)
- `describirUsuario(usuario: Usuario): string` — construye un mensaje
  distinto combinando un `switch` sobre el enum `rol` y comparaciones
  (`if`/`else`) sobre el tipo literal `estado`.
- `usuarios: Usuario[]` con 3 registros válidos.

## Compilar y ejecutar

```bash
tsc usuarios.ts
node usuarios.js
```

Salida esperada:
```
Sofía tiene control total del sistema, y actualmente está conectado.
Diego puede crear y modificar contenido, y aún no ha confirmado su cuenta.
Elena solo puede consultar contenido, pero lleva tiempo sin conectarse.
```

## Provocar el error con un estado inválido

Descomenta el cuarto objeto del array `usuarios` (el de `Javier`, con
`estado: 'baneado'`) y ejecuta:

```bash
tsc --noEmit usuarios.ts
```

Verás:
```
error TS2322: Type '"baneado"' is not assignable to type
'"activo" | "inactivo" | "pendiente"'.
```

## Idea clave

Un **tipo unión de literales** (`'activo' | 'inactivo' | 'pendiente'`)
actúa como una lista cerrada de valores permitidos: es más ligero que
un enum para casos simples, pero ofrece la misma seguridad en tiempo
de compilación. Los **enums**, en cambio, son útiles cuando además
quieres agrupar los valores bajo un nombre común (`Rol.ADMIN`) y
poder iterarlos o compararlos numéricamente.
