import { useState } from 'react'
import { Catalogo } from './components/Catalogo'
import { Carrito } from './components/Carrito'
import { ResumenCarrito } from './components/ResumenCarrito'
import { catalogo } from './catalogo'
import type { ItemCarrito, Producto } from './types'

export default function App() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([])

  function añadir(producto: Producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.idProducto === producto.id)
      if (existente) {
        if (existente.cantidad >= producto.stock) return actual
        return actual.map((item) => item.idProducto === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item)
      }
      if (producto.stock <= 0) return actual
      return [...actual, { idProducto: producto.id, cantidad: 1 }]
    })
  }

  function incrementar(idProducto: string) {
    const producto = catalogo.find((item) => item.id === idProducto)
    if (!producto) return
    setCarrito((actual) => actual.map((item) => item.idProducto === idProducto && item.cantidad < producto.stock
      ? { ...item, cantidad: item.cantidad + 1 }
      : item))
  }

  function decrementar(idProducto: string) {
    setCarrito((actual) => actual.flatMap((item) => {
      if (item.idProducto !== idProducto) return [item]
      if (item.cantidad <= 1) return []
      return [{ ...item, cantidad: item.cantidad - 1 }]
    }))
  }

  function eliminar(idProducto: string) {
    setCarrito((actual) => actual.filter((item) => item.idProducto !== idProducto))
  }

  function vaciar() {
    setCarrito([])
  }

  return (
    <main className="page-shell">
      <h1>Carrito de la compra</h1>
      <div className="store-layout">
        <Catalogo productos={catalogo} carrito={carrito} onAñadir={añadir} />
        <div className="cart-column">
          <Carrito
            carrito={carrito}
            productos={catalogo}
            onIncrementar={incrementar}
            onDecrementar={decrementar}
            onEliminar={eliminar}
            onVaciar={vaciar}
          />
          {carrito.length > 0 && <ResumenCarrito carrito={carrito} productos={catalogo} />}
        </div>
      </div>
    </main>
  )
}
