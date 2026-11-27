import { useState } from 'react'
import type { ItemCarrito, Producto } from '../types'
import { formatoEuro } from '../money'

interface FilaCarritoProps {
  item: ItemCarrito
  producto: Producto
  onIncrementar: () => void
  onDecrementar: () => void
  onEliminar: () => void
}

export function FilaCarrito({ item, producto, onIncrementar, onDecrementar, onEliminar }: FilaCarritoProps) {
  const [nota, setNota] = useState('')
  const subtotal = producto.precio * item.cantidad

  return (
    <article className="cart-row">
      <div className="cart-row-main">
        <div className="cart-row-heading">
          <h3>{producto.nombre}</h3>
          <strong>{formatoEuro.format(subtotal)}</strong>
        </div>
        <div className="cart-row-controls">
          <span className="unit-price">{formatoEuro.format(producto.precio)} / ud.</span>
          <div className="quantity-control" aria-label={`Cantidad de ${producto.nombre}`}>
            <button className="button button-step" type="button" onClick={onDecrementar} aria-label={`Restar una unidad de ${producto.nombre}`}>−</button>
            <span className="quantity" aria-live="polite">{item.cantidad}</span>
            <button
              className="button button-step"
              type="button"
              onClick={onIncrementar}
              disabled={item.cantidad >= producto.stock}
              aria-label={`Añadir una unidad de ${producto.nombre}`}
            >+</button>
            <button className="button button-outline-danger remove-button" type="button" onClick={onEliminar}>Eliminar</button>
          </div>
        </div>
        <label className="sr-only" htmlFor={`nota-${producto.id}`}>Nota para regalo de {producto.nombre}</label>
        <input
          className="gift-note"
          id={`nota-${producto.id}`}
          type="text"
          placeholder="Nota para regalo"
          value={nota}
          onChange={(event) => setNota(event.target.value)}
        />
      </div>
    </article>
  )
}
