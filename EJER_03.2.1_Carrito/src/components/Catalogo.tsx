import type { Producto, ItemCarrito } from '../types'
import { TarjetaProducto } from './TarjetaProducto'

interface CatalogoProps {
  productos: Producto[]
  carrito: ItemCarrito[]
  onAñadir: (producto: Producto) => void
}

export function Catalogo({ productos, carrito, onAñadir }: CatalogoProps) {
  return (
    <section aria-labelledby="catalogo-title">
      <h2 className="section-title" id="catalogo-title">Catálogo</h2>
      <div className="product-grid">
        {productos.map((producto) => {
          const cantidad = carrito.find((item) => item.idProducto === producto.id)?.cantidad ?? 0
          return (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              cantidadEnCarrito={cantidad}
              onAñadir={() => onAñadir(producto)}
            />
          )
        })}
      </div>
    </section>
  )
}
