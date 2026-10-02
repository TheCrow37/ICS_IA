# Ejercicio 1 — Instalar y configurar TypeScript

## Pasos

1. **Instalar TypeScript globalmente**

   ```bash
   npm i -g typescript
   ```

2. **Comprobar versiones**

   ```bash
   npm -v
   tsc -v
   ```

3. **Archivos del proyecto** (ya incluidos en esta carpeta):
   - `index.html` — página básica que carga `principal.js`.
   - `principal.ts`:
     ```ts
     console.log('Hola TypeScript');
     ```

4. **Compilar el archivo `.ts`**

   ```bash
   tsc principal.ts
   ```

   Esto genera `principal.js` en la misma carpeta. Ábrelo y comprueba
   que contiene JavaScript válido (TypeScript solo elimina los tipos,
   en este caso no había ninguno que quitar).

5. **Comprobar el resultado**

   Abre `index.html` en el navegador y mira la consola (F12): debe
   aparecer `Hola TypeScript`.

6. **Generar `tsconfig.json`**

   ```bash
   tsc --init
   ```

   Esto crea un `tsconfig.json` con todas las opciones del compilador
   comentadas. A partir de aquí, con solo ejecutar `tsc` (sin indicar
   archivo) se compilará todo el proyecto según esa configuración.

## Resultado esperado en esta carpeta

```
ejercicio1/
├── index.html
├── principal.ts
├── principal.js     ← generado por tsc
└── tsconfig.json    ← generado por tsc --init
```
