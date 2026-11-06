# EJER_03.1.1 — Listas y componentes en React con TypeScript

Dashboard de tareas interactivo creado con React, TypeScript y Vite. Usa `npm install`, `npm run dev`, `npm run build` y `npm run lint` para instalar, iniciar y comprobar el proyecto.

## Componentes

- **App**: mantiene las tareas y el filtro seleccionado, calcula las tareas visibles y coordina los componentes.
- **Filtros**: presenta los cuatro filtros de prioridad y comunica cuál selecciona el usuario.
- **ResumenTareas**: muestra un mensaje calculado a partir de las tareas visibles y del total.
- **ListaTareas**: recorre las tareas visibles y renderiza una tarea por elemento.
- **Tarea**: muestra el texto, el estado y la prioridad de una tarea, y permite cambiar su estado con el teclado o el ratón.
