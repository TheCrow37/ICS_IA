import type { Producto } from '../types'
import { formatoEuro } from '../money'

interface TarjetaProductoProps {
  producto: Producto
  cantidadEnCarrito: number
  onAñadir: () => void
}

export function TarjetaProducto({ producto, cantidadEnCarrito, onAñadir }: TarjetaProductoProps) {
  const agotado = producto.stock === 0
  const sinMásUnidades = !agotado && cantidadEnCarrito >= producto.stock

  return (
    <article className="product-card">
      <h3>{producto.nombre}</h3>
      <p className="product-price">{formatoEuro.format(producto.precio)}</p>
      <button
        className="button button-primary add-button"
        type="button"
        onClick={onAñadir}
        disabled={agotado || sinMásUnidades}
        aria-label={`${agotado ? 'Agotado' : sinMásUnidades ? 'Sin más unidades' : 'Añadir'}: ${producto.nombre}`}
      >
        {agotado ? 'Agotado' : sinMásUnidades ? 'Sin más unidades' : 'Añadir'}
      </button>
    </article>
  )
}
