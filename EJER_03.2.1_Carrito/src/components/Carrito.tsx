import type { ItemCarrito, Producto } from '../types'
import { FilaCarrito } from './FilaCarrito'

interface CarritoProps {
  carrito: ItemCarrito[]
  productos: Producto[]
  onIncrementar: (idProducto: string) => void
  onDecrementar: (idProducto: string) => void
  onEliminar: (idProducto: string) => void
  onVaciar: () => void
}

export function Carrito({ carrito, productos, onIncrementar, onDecrementar, onEliminar, onVaciar }: CarritoProps) {
  return (
    <section aria-labelledby="cart-title">
      <h2 className="section-title" id="cart-title">Tu carrito</h2>
      {carrito.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-list">
            {carrito.map((item) => {
              const producto = productos.find((entry) => entry.id === item.idProducto)
              if (!producto) return null
              return (
                <FilaCarrito
                  key={item.idProducto}
                  item={item}
                  producto={producto}
                  onIncrementar={() => onIncrementar(item.idProducto)}
                  onDecrementar={() => onDecrementar(item.idProducto)}
                  onEliminar={() => onEliminar(item.idProducto)}
                />
              )
            })}
          </div>
          <button className="button button-outline-danger clear-button" type="button" onClick={onVaciar}>
            Vaciar carrito
          </button>
        </>
      )}
    </section>
  )
}
