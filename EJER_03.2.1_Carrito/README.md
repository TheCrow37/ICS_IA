# Carrito de la compra

Implementación en React + TypeScript del ejercicio. Sigue la composición `App` → `Catalogo` / `Carrito` y `FilaCarrito` / `ResumenCarrito` indicada en el esquema.

## Ejecutar

```bash
npm install
npm run dev
```

## Decisiones de estado

- `App` conserva únicamente `carrito: ItemCarrito[]`; los productos y sus datos siguen viviendo en `catalogo.ts`.
- El subtotal, las unidades, el envío y el total se calculan a partir del carrito y el catálogo durante el render.
- `FilaCarrito` conserva la nota para regalo en su propio estado local. Las filas usan `item.idProducto` como `key`, de modo que la nota permanece asociada al producto al añadir o quitar otras líneas.
- Las operaciones de cantidad validan el stock también dentro de las actualizaciones de estado.

Los estilos adaptan la composición de dos columnas del ejemplo a pantallas pequeñas.
