# EJER_04.1 · Estado, efectos y refs

Proyecto de prácticas con Vite, React y TypeScript. En la aplicación usa el selector o las teclas A1–D para cambiar entre ejercicios.

## Arranque

```bash
npm install
npm run dev
```

Antes de entregar, ejecutar:

```bash
npm run build
npm run lint
```

## Qué incluye

- **A1:** manejadores originales y corregidos para comparar el estado fijo durante un render.
- **A2:** carrito con `useReducer`, unión discriminada, cantidades, total derivado e historial para deshacer.
- **B1:** dos relojes con zonas horarias, temporizador y limpieza; incluye el `tic` de consola y un control para desmontarlos.
- **B2:** preferencias persistentes en `localStorage`, JSON leído como `unknown` y guarda de tipo.
- **B3:** detalle que carga `/alumnos.json`; al cambiar de alumno aborta la petición anterior.
- **B4:** valores derivados, acción en el evento `submit` y reinicio del estado local mediante `key`.
- **C1:** formulario controlado con referencias al DOM, foco, validación derivada y mostrar contraseña.
- **C2:** cronómetro con vueltas, id e instante en refs, cálculo a partir de `Date.now()` y limpieza al desmontar.
- **D:** cuaderno integrador con reductor, formulario, carga validada, lista ordenable y resumen derivado.

Los apartados B2 y B3 aparecían en la lista inicial del texto pegado, pero no tenían desarrollo detallado. Para completar el mapa, B2 persiste preferencias sencillas y B3 cancela la carga del detalle de alumno con `AbortController`.

## Respuestas

### A1 · Estado como foto

Partiendo de 0 y pulsando **Sumar 3** original, la consola imprime `Consola: 0` y la pantalla acaba mostrando `1`. Las tres llamadas usan el mismo `cuenta` capturado en ese render y programan el valor 1. El actualizador funcional recibe el valor pendiente: por eso **Duplicar** desde 0 produce 2 (`0 + 1`, después `1 × 2`); al pulsarlo otra vez, desde 2 se obtiene 6 (`2 + 1`, después `3 × 2`).

La versión corregida suma tres actualizaciones funcionales; cada una recibe el resultado de la anterior. La consola del manejador original muestra el estado de su render, no el valor ya actualizado.

### A2 · Carrito con `useReducer`

El reducer no modifica las líneas recibidas; devuelve arrays y objetos nuevos. Artículos y total se calculan con `reduce` durante el render. La variante de deshacer conserva una copia de las líneas previas en `historial` y restaura el último estado.

Para reproducir el chequeo exhaustivo, añade temporalmente una variante a `Accion` (por ejemplo `aplicarDescuento`) sin añadir un `case`: con `noImplicitReturns` TypeScript informa que el reductor no retorna un estado en todas las rutas (TS2366). Después añade el caso o quita la acción. El `switch` no necesita `default`.

### B1 · Reloj y limpieza

Cada reloj crea un intervalo y devuelve una función que lo cancela. En desarrollo, `StrictMode` ejecuta el ciclo de montaje, limpieza y montaje de nuevo para detectar efectos que no limpian recursos. Si se omite la limpieza, el primer intervalo queda vivo junto al nuevo; al ocultar el reloj, el intervalo huérfano sigue escribiendo `tic` porque ya no existe una limpieza que lo cancele.

### B2 · Persistencia

`localStorage` almacena texto, por eso al leerlo se usa `JSON.parse` con resultado `unknown` y se valida su forma antes de tratarlo como preferencias. El efecto sincroniza los cambios con el almacenamiento; si el JSON está roto o tiene una forma distinta, se vuelve a valores iniciales.

### B3 · Carreras y cancelación

El efecto se vuelve a ejecutar cuando cambia el id. Su limpieza aborta la petición anterior, así una respuesta lenta de otro alumno no sustituye al seleccionado. `AbortError` es la cancelación esperada y no se presenta como error al usuario.

### B4 · Cuándo no hace falta un efecto

1. El nombre completo se deriva como una variable durante el render: guardar otro estado sincronizado causaría un render adicional y duplicaría datos.
2. Guardar en el servidor es consecuencia directa de enviar el formulario, así que debe ocurrir en `onSubmit`, no como reacción a un estado `enviado`.
3. La identidad del comentario pertenece a cada ficha. Cambiar `key` al cambiar de alumno desmonta la ficha anterior y crea otra con el comentario vacío.

Al lintar las versiones originales, un efecto que depende solo de `enviado` y lee `nombre` activa `react-hooks/exhaustive-deps`: `nombre` falta en las dependencias. Dependiendo de la versión del plugin y las reglas activadas, los efectos que actualizan estado durante el efecto también pueden recibir avisos sobre renderizados en cascada. Las soluciones de este proyecto eliminan esos efectos y deben lintar sin avisos.

### C1 · Foco

`campoCorreo.current?.focus()` usa encadenamiento opcional porque `current` puede ser `null` antes de que React asigne el input o después de desmontarlo. Así no se intenta llamar a `focus` sobre una referencia vacía. La contraseña se muestra cambiando su `type`, conservando el mismo elemento input y su foco.

### C2 · Cronómetro

El id del temporizador va en una ref porque no se presenta en la interfaz: cambiarlo no debe renderizar. Si se guardara en estado, cada inicio dispararía renders por un dato interno y sería más fácil crear intervalos duplicados al reaccionar al estado. La ref también permite pararlo al reiniciar o desmontar. Para evitar la deriva del intervalo, se calcula cada lectura a partir de `Date.now()` y el instante de inicio.

### D · Cuaderno

La media, el número de aprobados y el mejor alumno se calculan a partir de `alumnos` en cada render. Guardar la media aparte podría dejarla desincronizada cuando se añade, elimina o cambia una nota; derivarla evita una segunda fuente de verdad.

El reductor recorta las notas a 0–10 incluso si la acción llega desde fuera del formulario, y descarta nombres vacíos. El id se genera en `anadir`, fuera del reductor, para mantenerlo puro.
